import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsRepository {
    constructor(private prisma: PrismaService) { }

    private readonly listSelect = {
        id: true,
        category: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        stock: true,
        imageUrl: true,
        createdAt: true,
    } satisfies Prisma.ProductSelect;

    private readonly productSelect = {
        id: true,
        category: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        stock: true,
        imageUrl: true,
    } satisfies Prisma.ProductSelect;

    findMany(args: { skip: number; take: number; where?: Prisma.ProductWhereInput }) {
        return this.prisma.product.findMany({
            ...args,
            orderBy: { createdAt: 'desc' },
            select: this.listSelect,
        });
    }

    count() {
        return this.prisma.product.count();
    }

    findById(id: number) {
        return this.prisma.product.findUnique({
            where: { id },
            select: this.productSelect,
        });
    }

    findBySlug(slug: string) {
        return this.prisma.product.findFirst({
            where: { slug },
            select: this.productSelect,
        });
    }

    findManyByIds(ids: number[]) {
        return this.prisma.product.findMany({ where: { id: { in: ids } } });
    }

    findManyByName(name: string) {
        return this.prisma.product.findMany({
            where: { name: { contains: name, mode: 'insensitive' } },
        });
    }

    create(data: Prisma.ProductUncheckedCreateInput) {
        return this.prisma.product.create({
            data,
            select: this.productSelect,
        });
    }

    update(id: number, data: Prisma.ProductUncheckedUpdateInput) {
        return this.prisma.product.update({
            where: { id },
            data,
            select: this.productSelect,
        });
    }

    delete(id: number) {
        return this.prisma.product.delete({ where: { id } });
    }

    updateStock(id: number, stock: Prisma.IntFieldUpdateOperationsInput) {
        return this.prisma.product.update({
            where: { id },
            data: { stock },
        });
    }
}