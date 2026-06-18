import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentCardsRepository {
    constructor(private prisma: PrismaService) { }

    findByUserId(userId: number) {
        return this.prisma.paymentCard.findMany({ where: { userId } });
    }

    findById(id: number) {
        return this.prisma.paymentCard.findUnique({ where: { id } });
    }

    findByIdAndUserId(id: number, userId: number) {
        return this.prisma.paymentCard.findFirst({ where: { id, userId } });
    }

    create(data: Prisma.PaymentCardUncheckedCreateInput) {
        return this.prisma.paymentCard.create({ data });
    }

    update(id: number, data: Prisma.PaymentCardUncheckedUpdateInput) {
        return this.prisma.paymentCard.update({ where: { id }, data });
    }

    delete(id: number, userId: number) {
        return this.prisma.paymentCard.delete({ where: { id, userId } });
    }
}
