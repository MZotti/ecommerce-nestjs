import { CreateOrderDto } from '@app/common/dto/orders/create-order.dto';
import { ProductDto } from '@app/common/dto/products/product.dto';
import { OrderStatusEnum } from '@app/common/enums/order-status.enum';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import { lastValueFrom } from 'rxjs';
import { OrdersRepository } from './orders.repository';
import { OrdersPaymentsService } from '../orders-payments/orders-payments.service';
import { OrdersFilter } from './orders.filter';
import { OrderPaginationDto } from '@app/common/dto/orders/order-pagination.dto';
import { OrderAnalyticsDto } from '@app/common/dto/analytics/order-analytics.dto';
import { PrismaService } from '@app/database/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        private ordersRepository: OrdersRepository,
        private orderPaymentService: OrdersPaymentsService,
        @Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy,
        @Inject('PRODUCTS_EVENTS') private productsEvents: ClientProxy,
        @Inject('PAYMENT_EVENTS') private paymentEvents: ClientProxy,
        @Inject('SHIPPING_EVENTS') private shipppingEvents: ClientProxy,
    ) { }

    async findAll(query: OrderPaginationDto) {
        const { page, perPage } = query
        const skip = (page - 1) * perPage;

        const where = OrdersFilter.build(query);

        const [data, total] = await Promise.all([
            this.ordersRepository.findMany({ skip, take: perPage, where }),
            this.ordersRepository.count(where),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                perPage,
                lastPage: Math.ceil(total / perPage),
            },
        };
    }

    async findCustomerOrders({ userId, page = 1, perPage = 30 }: { userId: number, page: number, perPage: number }) {
        const skip = (page - 1) * perPage;

        const [data, total] = await Promise.all([
            this.ordersRepository.findMany({ skip, take: perPage, where: { userId } }),
            this.ordersRepository.count({ userId }),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                perPage,
                lastPage: Math.ceil(total / perPage),
            },
        };
    }

    async find(id: number) {
        const existingOrder = await this.ordersRepository.findById(id);

        if (!existingOrder) {
            throw new AppRpcException(404, 'Order not found');
        }

        return existingOrder;
    }

    async create(dto: CreateOrderDto) {
        const { userId, items, paymentMethod } = dto;
        const { shippingCity, shippingCountry, shippingNeighborhood, shippingNumber, shippingState, shippingStreet, shippingZipCode, shippingComplement } = dto;

        const productIds = items.map(i => i.productId);

        const products = await lastValueFrom(
            this.productsClient.send<ProductDto[]>('findManyByIds', productIds),
        );

        const productMap = new Map(
            products.map(p => [p.id, p]),
        );

        let total = 0;

        const orderItems = items.map(item => {
            const product = productMap.get(item.productId);

            if (!product) {
                throw new AppRpcException(404, `Product ${item.productId} not found`);
            }

            const price = product.price;
            const subtotal = price * item.quantity;

            total += subtotal;

            return {
                productId: product.id,
                productName: product.name,
                productSlug: product.slug,
                productCategoryId: product.category.id,
                productCategorySlug: product.category.slug,
                productImageUrl: product.imageUrl,
                quantity: item.quantity,
                price,
            };
        });

        try {
            await lastValueFrom(
                this.productsClient.send('stockAvailable', orderItems),
            );
        } catch (error: any) {
            throw new AppRpcException(403, error.message ?? 'Insufficient stock');
        }

        const order = await this.ordersRepository.create({
            userId,
            total,
            paymentMethod,
            status: OrderStatusEnum.PENDING,
            items: { create: orderItems },
            shippingCity,
            shippingComplement,
            shippingCountry,
            shippingNeighborhood,
            shippingNumber,
            shippingState,
            shippingStreet,
            shippingZipCode,
        });

        this.productsEvents.emit('orderCreated', { items: orderItems });
        this.paymentEvents.emit('orderCreated', { id: order.id, paymentMethod: order.paymentMethod, total: order.total });

        if (paymentMethod === "CREDIT" || paymentMethod === "DEBIT") {
            const { cardBrand, cardNumber, holderName, expiresMonth, expiresYear } = dto;

            this.orderPaymentService.create({
                orderId: order.id,
                cardBrand,
                cardNumber,
                expiresMonth,
                expiresYear,
                holderName
            })
        }

        return order;
    }

    async shipOrder(id: number) {
        const existingOrder = await this.ordersRepository.findById(id);

        if (!existingOrder) {
            throw new AppRpcException(404, 'Order not found');
        }

        if (existingOrder.status !== OrderStatusEnum.PAID) {
            throw new AppRpcException(403, 'Order can only be shipped if status is "PAID"');
        }

        const order = await this.ordersRepository.update(id, { status: OrderStatusEnum.SHIPPED });

        this.shipppingEvents.emit('orderShipped', { id });

        return order;
    }

    async cancelOrder(id: number) {
        const existingOrder = await this.ordersRepository.findById(id);

        if (!existingOrder) {
            throw new AppRpcException(404, 'Order not found');
        }

        if (existingOrder.status == OrderStatusEnum.FINISHED) {
            throw new AppRpcException(403, 'Order already finished');
        }

        if (existingOrder.status == OrderStatusEnum.CANCELED) {
            throw new AppRpcException(403, 'Order already canceled');
        }

        const orderItems = await this.ordersRepository.findOrderItems(id);
        const order = await this.ordersRepository.update(id, { status: OrderStatusEnum.CANCELED });

        this.productsEvents.emit('orderCanceled', { items: orderItems });

        return order;
    }

    async updateStatus(id: number, status: string) {
        const existingOrder = await this.ordersRepository.findById(id);

        if (!existingOrder) {
            throw new AppRpcException(404, 'Order not found');
        }

        const statusEnum = OrderStatusEnum[status];
        const order = await this.ordersRepository.update(id, { status: statusEnum });

        if (statusEnum == OrderStatus.CANCELED) {
            const orderItems = await this.ordersRepository.findOrderItems(id);
            this.productsEvents.emit('orderCanceled', { items: orderItems });
        }

        return order;
    }

    async getOrdersPerMonth(query: OrderAnalyticsDto) {
        const data = await this.prisma.$queryRaw<{ month: Date, value: number }[]>`
            SELECT 
                DATE_TRUNC('month', "createdAt") AS month, 
                COUNT(id) AS value
            FROM "Order"
            GROUP BY DATE_TRUNC('month', "createdAt")
            ORDER BY month DESC;
        `;

        const months = [
            {
                month: 1,
                label: "Jan",
                value: 0,
            },
            {
                month: 2,
                label: "Feb",
                value: 0,
            },
            {
                month: 3,
                label: "Mar",
                value: 0,
            },
            {
                month: 4,
                label: "Apr",
                value: 0,
            },
            {
                month: 5,
                label: "May",
                value: 0,
            },
            {
                month: 6,
                label: "Jun",
                value: 0,
            },
            {
                month: 7,
                label: "Jul",
                value: 0,
            },
            {
                month: 8,
                label: "Augt",
                value: 0,
            },
            {
                month: 9,
                label: "Sep",
                value: 0,
            },
            {
                month: 10,
                label: "Oct",
                value: 0,
            },
            {
                month: 11,
                label: "Nov",
                value: 0,
            },
            {
                month: 12,
                label: "Dec",
                value: 0,
            },
        ]

        const ordersPerMonth = months.map(month => {
            const value = Number(data.find(val => val.month.getMonth() + 1 === month.month)?.value) || 0
            return {
                label: month.label,
                value: value
            }
        })

        return ordersPerMonth
    }

    async getPaymentMethods(query: OrderAnalyticsDto) {
        const where = OrdersFilter.buildAnalytics(query);

        const data = await this.ordersRepository.groupBy("paymentMethod", { where });

        const paymentMethods = data.map(a => {
            return {
                label: a.paymentMethod,
                value: a._count.id
            }
        })

        return paymentMethods
    }

    async getOrdersStatus(query: OrderAnalyticsDto) {
        const where = OrdersFilter.buildAnalytics(query);

        const data = await this.ordersRepository.groupBy("status", {
            where: {
                status: {
                    in: ['PENDING', 'PAID', 'SHIPPED']
                },
                ...where
            },
        });

        const ordersStatus = data.map(a => {
            return {
                label: a.status,
                value: a._count.id
            }
        })

        return ordersStatus
    }
}