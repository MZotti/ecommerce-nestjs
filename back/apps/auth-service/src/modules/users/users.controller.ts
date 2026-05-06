import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/users/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/users/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @MessagePattern('findAllUsers')
    async findAll(@Payload() payload: { page: number; perPage: number; search: string }) {
        return this.usersService.findAll(payload);
    }

    @MessagePattern('findUser')
    async find(@Payload() payload: { id: string; }) {
        const { id } = payload;

        return this.usersService.find(Number(id));
    }

    @MessagePattern('createUser')
    async create(@Payload() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @MessagePattern('updateUser')
    async update(@Payload() payload: { id: string; data: UpdateUserDto }) {
        const { id, data } = payload;

        return this.usersService.update(Number(id), data);
    }

    @MessagePattern('deleteUser')
    async delete(@Payload() payload: { id: string; }) {
        const { id } = payload;

        return this.usersService.delete(Number(id));
    }
}
