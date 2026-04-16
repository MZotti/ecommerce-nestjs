import { CreateProductDto } from '@app/common/dto/products/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/products/update-product.dto';
import { Body, Controller, Delete, Get, HttpException, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
    ) { }

    @Get()
    async findAll() {
        return this.client.send('findAllProducts', {});
    }

    @Get(':id')
    async find(@Param('id') id: number) {
        try {
            return await lastValueFrom(
                this.client.send('findProduct', { id })
            );
        } catch (error: any) {
            if (error?.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            }

            throw new HttpException(
                'Internal server error',
                500,
            );
        }
    }

    @Post()
    async create(@Body() dto: CreateProductDto) {
        return this.client.send('create', dto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
        try {
            return await lastValueFrom(
                this.client.send('update', { id, data: dto })
            );
        } catch (error: any) {
            if (error?.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            }

            throw new HttpException(
                'Internal server error',
                500,
            );
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            return await lastValueFrom(
                this.client.send('delete', { id })
            );
        } catch (error: any) {
            if (error?.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            }

            throw new HttpException(
                'Internal server error',
                500,
            );
        }
    }
}
