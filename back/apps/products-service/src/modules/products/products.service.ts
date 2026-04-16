import { CreateProductDto } from '@app/common/dto/products/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/products/update-product.dto';
import { PrismaService } from '@app/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import slugfy from 'slugify';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.product.findMany();
    }

    async find(id: number) {
        const existingProduct = await this.prisma.product.findUnique({
            where: { id },
            select: {
                id: true,
                category: true,
                name: true,
                slug: true,
                description: true,
                price: true,
                stock: true
            },
        });

        if (!existingProduct) {
            throw new RpcException({
                statusCode: 404,
                message: 'Product not found',
            });
        }

        return existingProduct;
    }

    async create(dto: CreateProductDto) {
        const { name, categoryId, description, price, stock } = dto;

        const slug = slugfy(name);

        return this.prisma.product.create({
            data: {
                categoryId,
                name,
                slug,
                description,
                price,
                stock
            },
            select: {
                id: true,
                category: true,
                name: true,
                slug: true,
                description: true,
                price: true,
                stock: true
            },
        });
    }

    async update(id: number, dto: UpdateProductDto) {
        const { name } = dto;

        const existingProduct = await this.prisma.product.findUnique({ where: { id } });

        if (!existingProduct) {
            throw new RpcException({
                statusCode: 404,
                message: 'Product not found',
            });
        }

        const slug = slugfy(name);

        return this.prisma.product.update({
            where: { id },
            data: { slug: slug, ...dto },
            select: {
                id: true,
                category: true,
                name: true,
                slug: true,
                description: true,
                price: true,
                stock: true
            },
        });
    }

    async delete(id: number) {
        const existingProduct = await this.prisma.product.findUnique({ where: { id } });

        if (!existingProduct) {
            throw new RpcException({
                statusCode: 404,
                message: 'Product not found',
            });
        }

        await this.prisma.product.delete({
            where: { id }
        });

        return {};
    }
}
