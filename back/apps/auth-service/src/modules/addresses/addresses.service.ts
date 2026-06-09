import { CreateAddressDto } from '@app/common/dto/addresses/create-address.dto';
import { PrismaService } from '@app/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressesService {
    constructor(private prisma: PrismaService) { }

    async get(userId: number) {
        return this.prisma.address.findMany({ where: { userId } })
    }

    async create(userId: number, dto: CreateAddressDto) {
        let isDefault = false;

        const existingAddresses = await this.prisma.address.count({
            where: {
                userId
            }
        })

        if (existingAddresses === 0)
            isDefault = true;

        return await this.prisma.address.create({
            data: {
                userId,
                isDefault,
                ...dto
            }
        })
    }
}
