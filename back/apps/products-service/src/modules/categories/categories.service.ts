import { PrismaService } from '@app/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.category.findMany({})
    }
}
