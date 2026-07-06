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

@Injectable()
export class OrdersService {
    constructor(
        private ordersRepository: OrdersRepository,
        private orderPaymentService: OrdersPaymentsService,
        @Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy,
        @Inject('EVENT_BUS') private eventBus: ClientProxy
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

        this.eventBus.emit('orderCreated', { items: orderItems });

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

        this.eventBus.emit('orderCanceled', { items: orderItems });

        return order;
    }

    async updateStatus(id: number, status: string) {
        const existingOrder = await this.ordersRepository.findById(id);

        if (!existingOrder) {
            throw new AppRpcException(404, 'Order not found');
        }

        const statusEnum = OrderStatusEnum[status];
        const order = await this.ordersRepository.update(id, { status: statusEnum });

        if (status == 'cancelled') {
            const orderItems = await this.ordersRepository.findOrderItems(id);
            this.eventBus.emit('orderCanceled', { items: orderItems });
        }

        return order;
    }
}