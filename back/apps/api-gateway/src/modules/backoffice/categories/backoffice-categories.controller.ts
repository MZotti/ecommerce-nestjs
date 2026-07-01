import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { RolesGuard } from '../../../common/jwt/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('backoffice/categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER', 'OPERATIONAL', 'ANALYST')
export class BackofficeCategoriesController {
    constructor(
        @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
    ) { }

    @Get()
    async findAll() {
        return this.client.send('findAllCategories', {})
    }
}
