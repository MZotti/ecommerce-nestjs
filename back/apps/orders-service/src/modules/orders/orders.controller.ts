import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/common/dto/orders/create-order.dto';
import { CreateCustomerOrderDto } from '@app/common/dto/orders/create-customer-order.dto';
import { OrderPaginationDto } from '@app/common/dto/orders/order-pagination.dto';
import { OrderAnalyticsDto } from '@app/common/dto/analytics/order-analytics.dto';
import { OrderStatus } from '@prisma/client';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) { }

    @MessagePattern('findAllOrders')
    async findAll(@Payload() payload: { query: OrderPaginationDto }) {
        const { query } = payload

        return this.ordersService.findAll(query);
    }

    @MessagePattern('findCustomerOrders')
    async findCustomerOrders(@Payload() payload: { userId: number, page: number; perPage: number }) {
        return this.ordersService.findCustomerOrders(payload);
    }

    @MessagePattern('findOrder')
    async find(@Payload() payload: { id: number; }) {
        const { id } = payload;

        return this.ordersService.find(Number(id));
    }

    @MessagePattern('createOrder')
    async create(@Payload() dto: CreateOrderDto) {
        return this.ordersService.create(dto);
    }

    @MessagePattern('createCustomerOrder')
    async createCustomerOrder(@Payload() payload: { userId: number, dto: CreateCustomerOrderDto }) {
        const { userId, dto } = payload;
        const orderDto = {
            userId,
            ...dto
        }

        return this.ordersService.create(orderDto);
    }

    @MessagePattern('cancelOrder')
    async cancelOrder(@Payload() payload: { id: number; }) {
        const { id } = payload

        return this.ordersService.cancelOrder(Number(id));
    }

    @EventPattern('updateOrderStatus')
    async statusUpdated(@Payload() data: { id: number, status: OrderStatus }, @Ctx() context: RmqContext) {
        const { id, status } = data;
        const channel = context.getChannelRef();
        const message = context.getMessage();

        try {
            this.ordersService.updateStatus(id, status);
            channel.ack(message);
        } catch (error) {
            channel.nack(message);
        }
    }

    @MessagePattern('getOrdersPerMonth')
    async ordersPerMonth(@Payload() payload: { query: OrderAnalyticsDto }) {
        const { query } = payload;

        return this.ordersService.getOrdersPerMonth(query);
    }

    @MessagePattern('getPaymentMethods')
    async paymentMethods(@Payload() payload: { query: OrderAnalyticsDto }) {
        const { query } = payload;

        return this.ordersService.getPaymentMethods(query);
    }

    @MessagePattern('getOrdersStatus')
    async ordersStatus(@Payload() payload: { query: OrderAnalyticsDto }) {
        const { query } = payload;

        return this.ordersService.getOrdersStatus(query);
    }

}
