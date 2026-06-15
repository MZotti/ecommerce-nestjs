import { CreateUserDto } from '@app/common/dto/users/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/users/update-user.dto';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { handleRpcError } from '../../../common/utils/handle-rpc-error.util';

@Controller('backoffice/users')
export class BackofficeUsersController {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('perPage') perPage = 10,
        @Query('search') search = ""
    ) {
        return this.client.send('findAllUsers', {
            page: Number(page),
            perPage: Number(perPage),
            search: search,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async find(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('findUser', { id })
        ).catch(handleRpcError);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.client.send('createUser', dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return lastValueFrom(
            this.client.send('updateUser', { id, data: dto })
        ).catch(handleRpcError);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('deleteUser', { id })
        ).catch(handleRpcError);
    }
}
