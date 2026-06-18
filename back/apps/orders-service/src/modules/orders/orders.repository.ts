import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersRepository {
    constructor(private prisma: PrismaService) { }

    private readonly orderSelect = {
        id: true,
        userId: true,
        paymentMethod: true,
        status: true,
        total: true,
        items: true,
        shippingCity: true,
        shippingComplement: true,
        shippingCountry: true,
        shippingNeighborhood: true,
        shippingNumber: true,
        shippingState: true,
        shippingStreet: true,
        shippingZipCode: true,
        createdAt: true,
    } satisfies Prisma.OrderSelect;

    findMany(args: { skip: number; take: number; where?: Prisma.OrderWhereInput }) {
        return this.prisma.order.findMany({
            ...args,
            orderBy: { createdAt: 'desc' },
            select: this.orderSelect,
        });
    }

    count(where?: Prisma.OrderWhereInput) {
        return this.prisma.order.count({ where });
    }

    findById(id: number) {
        return this.prisma.order.findUnique({
            where: { id },
            select: { ...this.orderSelect, orderPayment: true},
        });
    }

    create(data: Prisma.OrderUncheckedCreateInput) {
        return this.prisma.order.create({
            data,
            include: { items: true },
        });
    }

    update(id: number, data: Prisma.OrderUncheckedUpdateInput) {
        return this.prisma.order.update({
            where: { id },
            data,
        });
    }

    findOrderItems(orderId: number) {
        return this.prisma.orderItem.findMany({ where: { orderId } });
    }
}