import { Body, Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateProductDto } from '@app/common/dto/products/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/products/update-product.dto';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @MessagePattern('findAllProducts')
    async findAll(@Payload() payload: { page: number; limit: number }) {
        return this.productsService.findAll(payload);
    }

    @MessagePattern('findManyByIds')
    async findManyByIds(@Body() ids: number[]) {
        return this.productsService.findManyByIds(ids);
    }

    @MessagePattern('findProduct')
    async find(@Payload() payload: { id: string; }) {
        const { id } = payload;

        return this.productsService.find(Number(id));
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
