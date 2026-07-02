import { CreateUserDto } from '@app/common/dto/users/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/users/update-user.dto';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { handleRpcError } from '../../../common/utils/handle-rpc-error.util';
import { RolesGuard } from '../../../common/jwt/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('backoffice/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER', 'OPERATIONAL', 'ANALYST')
export class BackofficeUsersController {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

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

    @Get(':id')
    async find(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('findUser', { id })
        ).catch(handleRpcError);
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.client.send('createUser', dto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return lastValueFrom(
            this.client.send('updateUser', { id, data: dto })
        ).catch(handleRpcError);
    }

    @Patch('active/:id')
    async active(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('activeUser', { id })
        ).catch(handleRpcError);
    }

    @Patch('inactive/:id')
    async inactive(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('inactiveUser', { id })
        ).catch(handleRpcError);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('deleteUser', { id })
        ).catch(handleRpcError);
    }
}
