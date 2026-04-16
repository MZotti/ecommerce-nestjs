import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from '@app/common/dto/products/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/products/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @MessagePattern('findAllProducts')
    async findAll() {
        return this.productsService.findAll();
    }

    @MessagePattern('findProduct')
    async find(@Payload() payload: { id: string; }) {
        const { id } = payload;

        return this.productsService.find(Number(id));
    }

    @MessagePattern('create')
    async create(@Payload() dto: CreateProductDto) {
        return this.productsService.create(dto);
    }

    @MessagePattern('update')
    async update(@Payload() payload: { id: string; data: UpdateProductDto }) {
        const { id, data } = payload;

        return this.productsService.update(Number(id), data);
    }

    @MessagePattern('delete')
    async delete(@Payload() payload: { id: string; }) {
        const { id } = payload;

        return this.productsService.delete(Number(id));
    }
}
