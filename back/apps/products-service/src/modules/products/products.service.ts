import { CreateProductDto } from '@app/common/dto/products/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/products/update-product.dto';
import { PrismaService } from '@app/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import slugfy from 'slugify';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll({ page, limit }: { page: number, limit: number }) {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.product.count(),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }

    async findManyByIds(ids: number[]) {
        return await this.prisma.product.findMany({
            where: { id: { in: ids } }
        });
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

        const slug = slugfy(name, {
            lower: true
        });

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

    async stockAvailable(items: { productId: number; quantity: number }[]) {
        for (const item of items) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                throw new RpcException(`Product not found: ${item.productId}`);
            }

            if (product.stock < item.quantity) {
                throw new RpcException(`Insufficient stock for ${product.name}`);
            }
        }

        return true;
    }

    async increaseStock(items: { productId: number; quantity: number }[]) {
        for (const item of items) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                throw new RpcException(`Product not found: ${item.productId}`);
            }

            await this.prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        increment: item.quantity,
                    },
                },
            });
        }

        return true;
    }

    async decreaseStock(items: { productId: number; quantity: number }[]) {
        for (const item of items) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                throw new RpcException(`Product not found: ${item.productId}`);
            }

            if (product.stock < item.quantity) {
                throw new RpcException(`Insufficient stock for ${product.name}`);
            }

            await this.prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
        }

        return true;
    }
}
