import { Body, Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateProductDto } from '@app/common/dto/products/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/products/update-product.dto';
import { ProductPaginationDto } from '@app/common/dto/products/product-pagination.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @MessagePattern('findAllProducts')
    async findAll(@Payload() payload: { query: ProductPaginationDto }) {
        const { query } = payload;
        return this.productsService.findAll(query);
    }

    @MessagePattern('findAllStoreProducts')
    async findAllStore(@Payload() payload: { page: number; perPage: number; search?: string; filter?: string; }) {
        return this.productsService.findAllStore(payload);
    }

    @MessagePattern('findManyByIds')
    async findManyByIds(@Body() ids: number[]) {
        return this.productsService.findManyByIds(ids);
    }

    @MessagePattern('findManyByName')
    async findManyByName(@Payload() payload: { search?: string }) {
        const { search } = payload

        return this.productsService.findManyByName(search);
    }

    @MessagePattern('findProduct')
    async find(@Payload() payload: { id: string; }) {
        const { id } = payload;

        return this.productsService.find(Number(id));
    }

    @MessagePattern('findBySlug')
    async findBySlug(@Payload() payload: { slug: string; }) {
        const { slug } = payload;

        return this.productsService.findBySlug(slug);
    }

    @MessagePattern('createProduct')
    async create(@Payload() dto: CreateProductDto) {
        return this.productsService.create(dto);
    }

    @MessagePattern('updateProduct')
    async update(@Payload() payload: { id: string; data: UpdateProductDto }) {
        const { id, data } = payload;

        return this.productsService.update(Number(id), data);
    }

    @MessagePattern('deleteProduct')
    async delete(@Payload() payload: { id: string; }) {
        const { id } = payload;

        return this.productsService.delete(Number(id));
    }

    @MessagePattern('stockAvailable')
    async stockAvailable(@Payload() items: { productId: number; quantity: number }[]) {
        return this.productsService.stockAvailable(items);
    }

    @MessagePattern('increaseProductStock')
    async increaseProductStock(@Payload() item: { productId: number; quantity: number }) {
        return this.productsService.increaseStock([item]);
    }

    @EventPattern('orderCreated')
    async handleOrderCreated(@Payload() data: { items: { productId: number; quantity: number }[] }, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();

        try {
            this.productsService.decreaseStock(data.items);
            channel.ack(message);
        } catch (error) {
            channel.nack(message);
        }
    }

    @EventPattern('orderCanceled')
    async handleOrderCanceled(@Payload() data: { items: { productId: number; quantity: number }[] }, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();

        try {
            this.productsService.increaseStock(data.items);
            channel.ack(message);
        } catch (error) {
            channel.nack(message);
        }
    }
}
