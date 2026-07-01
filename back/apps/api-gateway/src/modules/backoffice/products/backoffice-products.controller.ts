import { CreateProductDto } from '@app/common/dto/products/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/products/update-product.dto';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { IncreaseProductStockDto } from '@app/common/dto/products/increase-product-stock.dto';
import { handleRpcError } from '../../../common/utils/handle-rpc-error.util';
import { RolesGuard } from '../../../common/jwt/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('backoffice/products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER', 'OPERATIONAL', 'ANALYST')
export class BackofficeProductsController {
    constructor(
        @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
    ) { }

    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('perPage') perPage = 10,
        @Query('search') search = "",
    ) {
        return this.client.send('findAllProducts', {
            page: Number(page),
            perPage: Number(perPage),
            search: search
        });
    }

    @Get('/search')
    async findManyByName(
        @Query('search') search = "",
    ) {
        return this.client.send('findManyByName', { search });
    }

    @Get(':id')
    async find(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('findProduct', { id })
        ).catch(handleRpcError);
    }

    @Post()
    async create(@Body() dto: CreateProductDto) {
        return this.client.send('createProduct', dto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
        return lastValueFrom(
            this.client.send('updateProduct', { id, data: dto })
        ).catch(handleRpcError);
    }

    @Patch(':id/increase-stock')
    async increaseStock(@Param('id') id: number, @Body() dto: IncreaseProductStockDto) {
        return lastValueFrom(
            this.client.send('increaseProductStock', { productId: id, quantity: dto.quantity })
        ).catch(handleRpcError);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return lastValueFrom(
            this.client.send('deleteProduct', { id })
        ).catch(handleRpcError);
    }
}
