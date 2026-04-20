import { CreateProductDto } from '@app/common/dto/products/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/products/update-product.dto';
import { Body, Controller, Delete, Get, HttpException, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';

@Controller('backoffice/products')
export class BackofficeProductsController {
    constructor(
        @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.client.send('findAllProducts', {
            page: Number(page),
            limit: Number(limit)
        });
    }

    @UseGuards(JwtAuthGuard)
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
                error,
                500,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() dto: CreateProductDto) {
        return this.client.send('createProduct', dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
        try {
            return await lastValueFrom(
                this.client.send('updateProcuct', { id, data: dto })
            );
        } catch (error: any) {
            if (error?.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            }

            throw new HttpException(
                error,
                500,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            return await lastValueFrom(
                this.client.send('deleteProduct', { id })
            );
        } catch (error: any) {
            if (error?.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            }

            throw new HttpException(
                error,
                500,
            );
        }
    }
}
