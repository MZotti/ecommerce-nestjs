import { CreateProductDto } from '@app/common/dto/products/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/products/update-product.dto';
import { Injectable } from '@nestjs/common';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import { Prisma } from '@prisma/client';
import { ProductsRepository } from './products.repository';
import slugfy from 'slugify';

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) { }

    async findAll({ page, perPage, search }: { page: number, perPage: number, search?: string }) {
        const skip = (page - 1) * perPage;

        const where: Prisma.ProductWhereInput = {
            name: { contains: search, mode: 'insensitive' },
        };

        const [data, total] = await Promise.all([
            this.productsRepository.findMany({ skip, take: perPage, where }),
            this.productsRepository.count(),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                perPage,
                lastPage: Math.ceil(total / perPage),
            },
        };
    }

    async findAllStore({ page, perPage, search, filters }: { page: number, perPage: number, search?: string, filters?: string }) {
        const skip = (page - 1) * perPage;

        const where: Prisma.ProductWhereInput = {
            name: { contains: search, mode: 'insensitive' },
            stock: { gt: 0 },
            category: { slug: { contains: filters, mode: 'insensitive' } },
        };

        const [data, total] = await Promise.all([
            this.productsRepository.findMany({ skip, take: perPage, where }),
            this.productsRepository.count(),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                perPage,
                lastPage: Math.ceil(total / perPage),
            },
        };
    }

    async findManyByIds(ids: number[]) {
        return this.productsRepository.findManyByIds(ids);
    }

    async findManyByName(search?: string) {
        if (!search || search === '') return [];
        return this.productsRepository.findManyByName(search);
    }

    async find(id: number) {
        const existingProduct = await this.productsRepository.findById(id);

        if (!existingProduct) {
            throw new AppRpcException(404, 'Product not found');
        }

        return existingProduct;
    }

    async findBySlug(slug: string) {
        const existingProduct = await this.productsRepository.findBySlug(slug);

        if (!existingProduct) {
            throw new AppRpcException(404, 'Product not found');
        }

        return existingProduct;
    }

    async create(dto: CreateProductDto) {
        const { name, categoryId, description, price, stock } = dto;

        const slug = slugfy(name, { lower: true });

        return this.productsRepository.create({ categoryId, name, slug, description, price, stock });
    }

    async update(id: number, dto: UpdateProductDto) {
        const { name } = dto;

        const existingProduct = await this.productsRepository.findById(id);

        if (!existingProduct) {
            throw new AppRpcException(404, 'Product not found');
        }

        const slug = slugfy(name, { lower: true });

        console.log(dto);

        return this.productsRepository.update(id, { slug, ...dto });
    }

    async delete(id: number) {
        const existingProduct = await this.productsRepository.findById(id);

        if (!existingProduct) {
            throw new AppRpcException(404, 'Product not found');
        }

        await this.productsRepository.delete(id);

        return { id };
    }

    async stockAvailable(items: { productId: number; quantity: number }[]) {
        for (const item of items) {
            const product = await this.productsRepository.findById(item.productId);

            if (!product) {
                throw new AppRpcException(404, `Product ${item.productId} not found`);
            }

            if (product.stock < item.quantity) {
                throw new AppRpcException(403, `Insufficient stock for ${product.name}`);
            }
        }

        return true;
    }

    async increaseStock(items: { productId: number; quantity: number }[]) {
        for (const item of items) {
            const product = await this.productsRepository.findById(item.productId);

            if (!product) {
                throw new AppRpcException(404, `Product ${item.productId} not found`);
            }

            await this.productsRepository.updateStock(item.productId, { increment: item.quantity });
        }

        return true;
    }

    async decreaseStock(items: { productId: number; quantity: number }[]) {
        for (const item of items) {
            const product = await this.productsRepository.findById(item.productId);

            if (!product) {
                throw new AppRpcException(404, `Product ${item.productId} not found`);
            }

            if (product.stock < item.quantity) {
                throw new AppRpcException(403, `Insufficient stock for ${product.name}`);
            }

            await this.productsRepository.updateStock(item.productId, { decrement: item.quantity });
        }

        return true;
    }
}