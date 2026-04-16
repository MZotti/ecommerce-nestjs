import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
    controllers: [CategoriesController],
    imports: [CategoriesModule],
    providers: [CategoriesService]
})
export class CategoriesModule { }
