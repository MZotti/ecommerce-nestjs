import { Controller } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) { }

    @MessagePattern('findAllCategories')
    async findAll() {
        return this.categoriesService.findAll();
    }
}
