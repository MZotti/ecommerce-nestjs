import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentRepository {
    constructor(private prisma: PrismaService) { }

    private readonly paymentSelect = {
        id: true,
    } satisfies Prisma.PaymentSelect;

    findByTransactionId(transactionId: string) {
        return this.prisma.payment.findFirst({
            where: { transactionId }
        })
    }

    create(data: Prisma.PaymentUncheckedCreateInput) {
        return this.prisma.payment.create({
            data,
        });
    }

    update(id: number, data: Prisma.PaymentUncheckedUpdateInput) {
        return this.prisma.payment.update({
            where: { id },
            data,
        });
    }
}