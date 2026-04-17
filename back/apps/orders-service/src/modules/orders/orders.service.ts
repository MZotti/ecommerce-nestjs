import { CreateOrderDto } from '@app/common/dto/orders/create-order.dto';
import { ProductDto } from '@app/common/dto/products/product.dto';
import { OrderStatusEnum } from '@app/common/enums/order-status.enum';
import { PaymentMethodEnum } from '@app/common/enums/payment-method.enum';
import { PrismaService } from '@app/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        @Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy,
    ) { }

    async findAll({ page, limit }: { page: number, limit: number }) {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.order.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.order.count(),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }

    async find(id: number) {
        const existingOrder = await this.prisma.order.findUnique({
            where: { id },
        });

        if (!existingOrder) {
            throw new RpcException({
                statusCode: 404,
                message: 'Order not found',
            });
        }

        return existingOrder;
    }

    async create(dto: CreateOrderDto) {
        const { userId, items } = dto;

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
                throw new RpcException(`Product ${item.productId} not found`);
            }

            const price = product.price;
            const subtotal = price * item.quantity;

            total += subtotal;

            return {
                productId: product.id,
                quantity: item.quantity,
                price,
            };
        });

        try {
            await lastValueFrom(
                this.productsClient.send('decreaseStock', orderItems),
            );
        } catch (error: any) {
            throw new RpcException({
                statusCode: 403,
                message: error.message,
            });
        }

        return this.prisma.order.create({
            data: {
                userId,
                total,
                paymentMethod: PaymentMethodEnum.PIX,
                status: OrderStatusEnum.PENDING,
                items: {
                    create: orderItems,
                },
            },
            include: {
                items: true,
            },
        });
    }

    async cancelOrder(id: number) {
        const existingOrder = await this.prisma.order.findUnique({
            where: { id },
        });

        if (!existingOrder) {
            throw new RpcException({
                statusCode: 404,
                message: 'Order not found',
            });
        }

        if(existingOrder.status == OrderStatusEnum.CANCELED) {
            throw new RpcException({
                statusCode: 403,
                message: 'Order already canceled',
            });
        }

        const orderItems = await this.prisma.orderItem.findMany({
            where: { orderId: id },
        });

        try {
            await lastValueFrom(
                this.productsClient.send('increaseStock', orderItems),
            );
        } catch (error: any) {
            throw new RpcException({
                statusCode: 403,
                message: error.message,
            });
        }

        return await this.prisma.order.update({
            where: { id },
            data: { status: OrderStatusEnum.CANCELED }
        });
    }

}
