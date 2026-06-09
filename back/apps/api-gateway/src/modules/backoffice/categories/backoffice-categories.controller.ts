import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';

@Controller('backoffice/categories')
export class BackofficeCategoriesController {
    constructor(
        @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.client.send('findAllCategories', {})
    }
}
