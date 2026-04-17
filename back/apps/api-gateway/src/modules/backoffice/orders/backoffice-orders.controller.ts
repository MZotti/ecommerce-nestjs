import { CreateOrderDto } from '@app/common/dto/orders/create-order.dto';
import { Body, Controller, Get, HttpException, Inject, Param, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('backoffice/orders')
export class BackofficeOrdersController {
    constructor(
        @Inject('ORDERS_SERVICE') private client: ClientProxy,
    ) { }

    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.client.send('findAllOrders', {
            page: Number(page),
            limit: Number(limit)
        });
    }

    @Get(':id')
    async find(@Param('id') id: number) {
        try {
            return await lastValueFrom(
                this.client.send('findOrder', { id })
            );
        } catch (error: any) {
            if (error?.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            }

            throw new HttpException(
                'Internal server error',
                500,
            );
        }
    }

    @Post()
    async create(@Body() dto: CreateOrderDto) {
        return this.client.send('create', dto);
    }
}
