import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';

@Injectable()
export class CategoriesRepository {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.category.findMany();
    }
}