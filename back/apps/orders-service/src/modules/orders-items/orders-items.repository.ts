import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersItemsRepository {
    constructor(private prisma: PrismaService) { }

    private readonly orderItemSelect = {
        id: true,
    } satisfies Prisma.OrderItemSelect;

    findMany(args?: { skip: number; take: number; where?: Prisma.OrderItemWhereInput }) {
        return this.prisma.orderItem.findMany({

        });
    }

    groupByQuantity(args?: { where: Prisma.OrderItemWhereInput }) {
        return this.prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: {
                quantity: true,
            },
            orderBy: {
                _sum: {
                    quantity: 'desc',
                },
            },
            ...args,
            take: 5,
        })
    }
}