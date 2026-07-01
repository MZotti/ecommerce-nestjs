import { UpdateUserDto } from '@app/common/dto/users/update-user.dto';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { CreateCustomerDto } from '@app/common/dto/customers/create-customer.dto';
import { handleRpcError } from '../../../common/utils/handle-rpc-error.util';
import { RolesGuard } from '../../../common/jwt/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('backoffice/customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER', 'OPERATIONAL', 'ANALYST')
export class BackofficeCustomersController {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('perPage') perPage = 10,
        @Query('search') search = ""
    ) {
        return this.client.send('findAllCustomers', {
            page: Number(page),
            perPage: Number(perPage),
            search: search,
        });
    }

    @Get(':id')
    async find(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('findCustomer', { id })
        ).catch(handleRpcError);
    }

    @Post()
    async create(@Body() dto: CreateCustomerDto) {
        return this.client.send('createCustomer', dto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return lastValueFrom(
            this.client.send('updateUser', { id, data: dto })
        ).catch(handleRpcError);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('deleteUser', { id })
        ).catch(handleRpcError);
    }
}
