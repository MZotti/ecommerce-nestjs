import { CreateOrderDto } from '@app/common/dto/orders/create-order.dto';
import { Body, Controller, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { handleRpcError } from '../../../common/utils/handle-rpc-error.util';
import { RolesGuard } from '../../../common/jwt/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { OrderPaginationDto } from '@app/common/dto/orders/order-pagination.dto';

@Controller('backoffice/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER', 'OPERATIONAL', 'ANALYST')
export class BackofficeOrdersController {
    constructor(
        @Inject('ORDERS_SERVICE') private client: ClientProxy,
    ) { }

    @Get()
    async findAll(
        @Query() query: OrderPaginationDto
    ) {
        return this.client.send('findAllOrders', {
            query
        });
    }

    @Get(':id')
    async find(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('findOrder', { id })
        ).catch(handleRpcError);
    }

    @Post()
    async create(@Body() dto: CreateOrderDto) {
        return lastValueFrom(
            this.client.send('createOrder', dto)
        ).catch(handleRpcError);
    }

    @Patch('ship/:id')
    async shipOrder(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('shipOrder', { id })
        ).catch(handleRpcError);
    }

    @Patch('cancel/:id')
    async cancelOrder(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('cancelOrder', { id })
        ).catch(handleRpcError);
    }

    @Get('customer/:id')
    async findCustomerOrders(
        @Param('id') id: number,
        @Query('page') page = 1,
        @Query('perPage') perPage = 10,
        @Query('search') search = "",
    ) {
        return this.client.send('findCustomerOrders', {
            userId: id,
            page: Number(page),
            perPage: Number(perPage),
            search: search
        });
    }
}
