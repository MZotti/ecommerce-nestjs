import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/common/dto/orders/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) { }

    @MessagePattern('findAllOrders')
    async findAll(@Payload() payload: { page: number; perPage: number }) {
        return this.ordersService.findAll(payload);
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

    @MessagePattern('cancelOrder')
    async cancelOrder(@Payload() payload: { id: number; }) {
        const { id } = payload

        return this.ordersService.cancelOrder(Number(id));
    }
}
