import { CreateUserDto } from '@app/common/dto/users/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/users/update-user.dto';
import { Injectable } from '@nestjs/common';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import { Prisma } from '@prisma/client';
import { UsersRepository } from './users.repository';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) { }

    async findAll({ page, perPage, search }: { page: number, perPage: number, search?: string }) {
        const skip = (page - 1) * perPage;

        const where: Prisma.UserWhereInput = {
            roleId: { not: 5 },
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ],
        };

        const [data, total] = await Promise.all([
            this.usersRepository.findMany({ skip, take: perPage, where }),
            this.usersRepository.count(where),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                perPage,
                lastPage: Math.ceil(total / perPage),
            },
        };
    }

    async find(id: number) {
        const existingUser = await this.usersRepository.findById(id);

        if (!existingUser) {
            throw new AppRpcException(404, 'User not found');
        }

        return existingUser;
    }

    async create(dto: CreateUserDto) {
        const { name, email, roleId } = dto;

        const existingUser = await this.usersRepository.findByEmail(email);

        if (existingUser) {
            throw new AppRpcException(409, 'Email already in use');
        }

        const password = Math.random().toString(36).substring(2);
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.usersRepository.create({ name, email, password: hashedPassword, roleId });
    }

    async update(id: number, dto: UpdateUserDto) {
        const { email } = dto;

        const existingUser = await this.usersRepository.findById(id);

        if (!existingUser) {
            throw new AppRpcException(404, 'User not found');
        }

        if (email) {
            const existingEmail = await this.usersRepository.findByEmail(email, id);

            if (existingEmail) {
                throw new AppRpcException(409, 'Email already in use');
            }
        }

        return this.usersRepository.update(id, dto);
    }

    async delete(id: number) {
        const existingUser = await this.usersRepository.findById(id);

        if (!existingUser) {
            throw new AppRpcException(404, 'User not found');
        }

        await this.usersRepository.delete(id);

        return { id };
    }
}
