import { CreateCustomerDto } from '@app/common/dto/customers/create-customer.dto';
import { PrismaService } from '@app/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import * as bcrypt from 'bcrypt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomersService {
    constructor(
        private prisma: PrismaService,
        @Inject('ORDERS_SERVICE') private ordersClient: ClientProxy
    ) { }

    async findAll({ page, perPage, search }: { page: number, perPage: number, search?: string }) {
        const skip = (page - 1) * perPage;

        const [data, total] = await Promise.all([
            this.prisma.customer.findMany({
                skip,
                take: perPage,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    document: true,
                    phone: true,
                    birthDate: true,
                    createdAt: true,
                    user: {
                        include: {
                            addresses: true
                        },
                        omit: {
                            password: true
                        }
                    },
                },
                where: {
                    user: {
                        roleId: 5
                    },
                    OR: [
                        {
                            user: {
                                name: {
                                    contains: search,
                                    mode: 'insensitive'
                                },
                            }
                        },
                        {
                            user: {
                                email: {
                                    contains: search,
                                    mode: 'insensitive'
                                },
                            }
                        }
                    ]
                },
            }),
            this.prisma.customer.count(),
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
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { id },
            select: {
                id: true,
                document: true,
                phone: true,
                birthDate: true,
                createdAt: true,
                user: {
                    include: {
                        addresses: true
                    },
                    omit: {
                        password: true
                    }
                },
            },
        });

        if (!existingCustomer) {
            throw new RpcException({
                statusCode: 404,
                message: 'Customer not found',
            });
        }

        return existingCustomer;
    }

    async create(dto: CreateCustomerDto) {
        const { name, email, document, phone, birthdate } = dto;

        const existingUser = await this.prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw new RpcException({
                statusCode: 409,
                message: 'Email already in use',
            });
        }

        const existingCustomer = await this.prisma.customer.findFirst({ where: { document } });

        if (existingCustomer) {
            throw new RpcException({
                statusCode: 409,
                message: 'Document already in use',
            });
        }

        const password = Math.random().toString(36).substring(2);
        const hashedPassword = await bcrypt.hash(password, 10);

        const roleId = 5;

        return this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                roleId,
                customer: {
                    create: {
                        document,
                        phone
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                isActive: true,
                roleId: true,
                role: true,
                createdAt: true,
                customer: true,
            },
        });
    }
}
