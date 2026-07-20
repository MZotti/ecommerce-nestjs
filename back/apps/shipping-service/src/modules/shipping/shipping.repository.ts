import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShippingRepository {
    constructor(private prisma: PrismaService) { }

    private readonly paymentSelect = {
        id: true,
    } satisfies Prisma.PaymentSelect;

    create(data: Prisma.PaymentUncheckedCreateInput) {
        return this.prisma.payment.create({
            data,
        });
    }
}