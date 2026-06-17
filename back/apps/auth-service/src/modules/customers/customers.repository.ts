import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersRepository {
    constructor(private prisma: PrismaService) { }

    private readonly customerSelect = {
        id: true,
        document: true,
        phone: true,
        birthDate: true,
        createdAt: true,
        user: {
            include: { addresses: true },
            omit: { password: true },
        },
    };

    findMany(args: { skip: number; take: number; where?: Prisma.CustomerWhereInput }) {
        return this.prisma.customer.findMany({
            ...args,
            orderBy: { createdAt: 'desc' },
            select: this.customerSelect,
        });
    }

    count() {
        return this.prisma.customer.count();
    }

    findById(id: number) {
        return this.prisma.customer.findUnique({
            where: { id },
            select: this.customerSelect,
        });
    }

    findByDocument(document: string) {
        return this.prisma.customer.findFirst({ where: { document } });
    }

    findUserByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    createUserWithCustomer(data: {
        name: string;
        email: string;
        password: string;
        roleId: number;
        document: string;
        phone?: string;
    }) {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                roleId: data.roleId,
                customer: {
                    create: {
                        document: data.document,
                        phone: data.phone,
                    },
                },
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