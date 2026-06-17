import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressesRepository {
    constructor(private prisma: PrismaService) { }

    findByUserId(userId: number) {
        return this.prisma.address.findMany({ where: { userId } });
    }

    countByUserId(userId: number) {
        return this.prisma.address.count({ where: { userId } });
    }

    create(data: Prisma.AddressUncheckedCreateInput) {
        return this.prisma.address.create({ data });
    }
}