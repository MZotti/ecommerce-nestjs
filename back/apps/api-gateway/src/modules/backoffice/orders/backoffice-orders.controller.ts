import { CreateOrderDto } from '@app/common/dto/orders/create-order.dto';
import { Body, Controller, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { handleRpcError } from '../../../common/utils/handle-rpc-error.util';

@Controller('backoffice/orders')
export class BackofficeOrdersController {
    constructor(
        @Inject('ORDERS_SERVICE') private client: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('perPage') perPage = 10
    ) {
        return this.client.send('findAllOrders', {
            page: Number(page),
            perPage: Number(perPage)
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async find(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('findOrder', { id })
        ).catch(handleRpcError);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() dto: CreateOrderDto) {
        return lastValueFrom(
            this.client.send('createOrder', dto)
        ).catch(handleRpcError);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('cancel/:id')
    async cancelOrder(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('cancelOrder', { id })
        ).catch(handleRpcError);
    }

    @UseGuards(JwtAuthGuard)
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
