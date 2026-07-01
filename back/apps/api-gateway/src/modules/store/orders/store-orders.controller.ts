import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { CurrentUser } from 'apps/api-gateway/src/common/decorators/current-user.decorator';
import { CreateCustomerOrderDto } from '@app/common/dto/orders/create-customer-order.dto';
import { handleRpcError } from '../../../common/utils/handle-rpc-error.util';
import { RolesGuard } from 'apps/api-gateway/src/common/jwt/roles.guard';
import { Roles } from 'apps/api-gateway/src/common/decorators/roles.decorator';

@Controller('store/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
export class StoreOrdersController {
    constructor(
        @Inject('ORDERS_SERVICE') private client: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @CurrentUser('id') userId: number,
        @Query('page') page = 1,
        @Query('perPage') perPage = 10,
        @Query('search') search = "",
    ) {
        return this.client.send('findCustomerOrders', {
            userId,
            page: Number(page),
            perPage: Number(perPage),
            search: search
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
    async create(
        @CurrentUser('id') userId: number,
        @Body() dto: CreateCustomerOrderDto
    ) {
        return this.client.send('createCustomerOrder', { userId, dto });
    }
}
