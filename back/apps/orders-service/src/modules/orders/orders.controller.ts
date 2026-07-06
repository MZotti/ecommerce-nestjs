import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/common/dto/orders/create-order.dto';
import { CreateCustomerOrderDto } from '@app/common/dto/orders/create-customer-order.dto';
import { OrderPaginationDto } from '@app/common/dto/orders/order-pagination.dto';

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
}
