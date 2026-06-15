import { CreateOrderDto } from '@app/common/dto/orders/create-order.dto';
import { ProductDto } from '@app/common/dto/products/product.dto';
import { OrderStatusEnum } from '@app/common/enums/order-status.enum';
import { PrismaService } from '@app/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        @Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy,
        @Inject('EVENT_BUS') private eventBus: ClientProxy
    ) { }

    async findAll({ page, perPage }: { page: number, perPage: number }) {
        const skip = (page - 1) * perPage;

        const [data, total] = await Promise.all([
            this.prisma.order.findMany({
                skip,
                take: perPage,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    userId: true,
                    paymentMethod: true,
                    status: true,
                    total: true,
                    items: true,
                    shippingCity: true,
                    shippingComplement: true,
                    shippingCountry: true,
                    shippingNeighborhood: true,
                    shippingNumber: true,
                    shippingState: true,
                    shippingStreet: true,
                    shippingZipCode: true,
                    createdAt: true
                }
            }),
            this.prisma.order.count(),
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
            this.prisma.order.findMany({
                skip,
                take: perPage,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    userId: true,
                    paymentMethod: true,
                    status: true,
                    total: true,
                    items: true,
                    shippingCity: true,
                    shippingComplement: true,
                    shippingCountry: true,
                    shippingNeighborhood: true,
                    shippingNumber: true,
                    shippingState: true,
                    shippingStreet: true,
                    shippingZipCode: true,
                    createdAt: true
                },
                where: {
                    userId
                }
            }),
            this.prisma.order.count({
                where: {
                    userId
                }
            }),
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
        const existingOrder = await this.prisma.order.findUnique({
            where: { id },
            select: {
                id: true,
                userId: true,
                paymentMethod: true,
                status: true,
                total: true,
                items: true,
                shippingCity: true,
                shippingComplement: true,
                shippingCountry: true,
                shippingNeighborhood: true,
                shippingNumber: true,
                shippingState: true,
                shippingStreet: true,
                shippingZipCode: true,
                createdAt: true
            }
        });

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
            console.log(error);
            throw new AppRpcException(403, error.message ?? 'Insufficient stock');
        }

        const order = this.prisma.order.create({
            data: {
                userId,
                total,
                paymentMethod,
                status: OrderStatusEnum.PENDING,
                items: {
                    create: orderItems,
                },
                shippingCity,
                shippingComplement,
                shippingCountry,
                shippingNeighborhood,
                shippingNumber,
                shippingState,
                shippingStreet,
                shippingZipCode
            },
            include: {
                items: true,
            },
        });

        this.eventBus.emit('orderCreated', { items: orderItems });

        return order;
    }

    async cancelOrder(id: number) {
        const existingOrder = await this.prisma.order.findUnique({
            where: { id },
        });

        if (!existingOrder) {
            throw new AppRpcException(404, 'Order not found');
        }

        if (existingOrder.status == OrderStatusEnum.FINISHED) {
            throw new AppRpcException(403, 'Order already finished');
        }

        if (existingOrder.status == OrderStatusEnum.CANCELED) {
            throw new AppRpcException(403, 'Order already canceled');
        }

        const orderItems = await this.prisma.orderItem.findMany({
            where: { orderId: id },
        });

        const order = await this.prisma.order.update({
            where: { id },
            data: { status: OrderStatusEnum.CANCELED }
        });

        this.eventBus.emit('orderCanceled', { items: orderItems });

        return order;
    }


    async updateStatus(id: number, status: string) {
        const existingOrder = await this.prisma.order.findUnique({
            where: { id },
        });

        if (!existingOrder) {
            throw new AppRpcException(404, 'Order not found');
        }

        const statusEnum = OrderStatusEnum[status]

        const order = await this.prisma.order.update({
            where: { id },
            data: { status: statusEnum }
        });

        if (status == 'cancelled') {
            const orderItems = await this.prisma.orderItem.findMany({
                where: { orderId: id },
            });
            this.eventBus.emit('orderCanceled', { items: orderItems });
        }

        return order;
    }
}
