import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('backoffice/categories')
export class BackofficeCategoriesController {
    constructor(
        @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
    ) { }

    @Get()
    async findAll() {
        return this.client.send('findAllCategories', {})
    }
}
