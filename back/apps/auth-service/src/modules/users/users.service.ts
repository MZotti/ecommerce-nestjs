import { CreateUserDto } from '@app/common/dto/users/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/users/update-user.dto';
import { PrismaService } from '@app/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findAll({ page, perPage }: { page: number, perPage: number }) {
        const skip = (page - 1) * perPage;

        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: perPage,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
            }),
            this.prisma.user.count(),
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
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        if (!existingUser) {
            throw new RpcException({
                statusCode: 404,
                message: 'User not found',
            });
        }

        return existingUser;
    }

    async create(dto: CreateUserDto) {
        const { name, email, roleId } = dto;

        const existingUser = await this.prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw new RpcException({
                statusCode: 409,
                message: 'Email already in use',
            });
        }

        const password = Math.random().toString(36).substring(2);
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                roleId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            },
        });
    }

    async update(id: number, dto: UpdateUserDto) {
        const { email } = dto;

        const existingUser = await this.prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            throw new RpcException({
                statusCode: 404,
                message: 'User not found',
            });
        }

        const existingEmail = await this.prisma.user.findUnique({ where: { email, NOT: { id } } });

        if (existingEmail) {
            throw new RpcException({
                statusCode: 409,
                message: 'Email already in use',
            });
        }

        return this.prisma.user.update({
            where: { id },
            data: dto,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            },
        });
    }

    async delete(id: number) {
        const existingUser = await this.prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            throw new RpcException({
                statusCode: 404,
                message: 'User not found',
            });
        }

        await this.prisma.user.delete({
            where: { id }
        });

        return {};
    }
}
