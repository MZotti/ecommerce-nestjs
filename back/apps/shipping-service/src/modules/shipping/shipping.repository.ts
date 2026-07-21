import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShippingRepository {
    constructor(private prisma: PrismaService) { }

    private readonly paymentSelect = {
        id: true,
    } satisfies Prisma.ShippingSelect;

    findById(id: number) {
        return this.prisma.shipping.findUnique({
            where: { id }
        });
    }

    findByOrderId(orderId: number) {
        return this.prisma.shipping.findFirst({
            where: { orderId }
        })
    }

    create(data: Prisma.ShippingUncheckedCreateInput) {
        return this.prisma.shipping.create({
            data,
        });
    }

    update(id: number, data: Prisma.ShippingUncheckedUpdateInput) {
        return this.prisma.shipping.update({
            where: { id },
            data
        })
    }
}