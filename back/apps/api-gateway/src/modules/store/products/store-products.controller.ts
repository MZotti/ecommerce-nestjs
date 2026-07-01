import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { handleRpcError } from '../../../common/utils/handle-rpc-error.util';

@Controller('store/products')
export class StoreProductsController {
    constructor(
        @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
    ) { }

    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('perPage') perPage = 10,
        @Query('search') search = "",
        @Query('filters') filters = "",
    ) {
        return this.client.send('findAllStoreProducts', {
            page: Number(page),
            perPage: Number(perPage),
            search,
            filters
        });
    }

    @Get(':slug')
    async find(@Param('slug') slug: string) {
        return lastValueFrom(
            this.client.send('findBySlug', { slug })
        ).catch(handleRpcError);
    }
}
