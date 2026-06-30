import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressesRepository {
    constructor(private prisma: PrismaService) { }

    findByUserId(userId: number) {
        return this.prisma.address.findMany({ where: { userId } });
    }

    findAddress(userId: number, addressId: number) {
        return this.prisma.address.findFirst({
            where: {
                id: addressId,
                userId
            }
        });
    }

    countByUserId(userId: number) {
        return this.prisma.address.count({ where: { userId } });
    }

    create(data: Prisma.AddressUncheckedCreateInput) {
        return this.prisma.address.create({ data });
    }

    update(id: number, data: Prisma.AddressUncheckedUpdateInput) {
        return this.prisma.address.update({
            where: {
                id
            },
            data
        });
    }

    setAsDefault(userId: number, addressId: number) {
        return this.prisma.address.update({
            where: {
                id: addressId,
                userId
            },
            data: {
                isDefault: true
            },
            select: {
                id: true,
                isDefault: true
            }
        })
    }

    unsetDefault(userId: number) {
        return this.prisma.address.updateMany({
            where: {
                userId
            },
            data: {
                isDefault: false
            }
        })
    }

    delete(userId: number, addressId: number) {
        return this.prisma.address.delete({
            where: {
                id: addressId,
                userId
            }
        })
    }
}