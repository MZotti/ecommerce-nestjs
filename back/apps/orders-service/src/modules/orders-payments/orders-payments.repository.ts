import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersPaymentsRepository {
    constructor(private prisma: PrismaService) { }

    create(data: Prisma.OrderPaymentUncheckedCreateInput) {
        return this.prisma.orderPayment.create({
            data
        })
    }
}