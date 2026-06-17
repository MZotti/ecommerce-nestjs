import { CreateCustomerDto } from '@app/common/dto/customers/create-customer.dto';
import { Injectable } from '@nestjs/common';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import { Prisma } from '@prisma/client';
import { CustomersRepository } from './customers.repository';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
    constructor(private customersRepository: CustomersRepository) { }

    async findAll({ page, perPage, search }: { page: number, perPage: number, search?: string }) {
        const skip = (page - 1) * perPage;

        const where: Prisma.CustomerWhereInput = {
            user: { roleId: 5 },
            OR: [
                { user: { name: { contains: search, mode: 'insensitive' } } },
                { user: { email: { contains: search, mode: 'insensitive' } } },
            ],
        };

        const [data, total] = await Promise.all([
            this.customersRepository.findMany({ skip, take: perPage, where }),
            this.customersRepository.count(),
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
        const existingCustomer = await this.customersRepository.findById(id);

        if (!existingCustomer) {
            throw new AppRpcException(404, 'Customer not found');
        }

        return existingCustomer;
    }

    async create(dto: CreateCustomerDto) {
        const { name, email, document, phone } = dto;

        const existingUser = await this.customersRepository.findUserByEmail(email);

        if (existingUser) {
            throw new AppRpcException(409, 'Email already in use');
        }

        const existingCustomer = await this.customersRepository.findByDocument(document);

        if (existingCustomer) {
            throw new AppRpcException(409, 'Document already in use');
        }

        const password = Math.random().toString(36).substring(2);
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.customersRepository.createUserWithCustomer({
            name,
            email,
            password: hashedPassword,
            roleId: 5,
            document,
            phone,
        });
    }
}