import { Controller } from '@nestjs/common';
import { OrdersItemsService } from './orders-items.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductAnalyticsDto } from '@app/common/dto/analytics/product-analytics.dto';

@Controller('order-items')
export class OrdersItemsController {
    constructor(
        private readonly ordersItemsService: OrdersItemsService
    ) { }

    @MessagePattern('getBestSellingItems')
    async bestSelling(@Payload() payload: { query: ProductAnalyticsDto }) {
        const { query } = payload
        
        return this.ordersItemsService.bestSellingItems(query);
    }

    @MessagePattern('getMostRentableItems')
    async mostRentable(@Payload() payload: { query: ProductAnalyticsDto }) {
        const { query } = payload
        
        return this.ordersItemsService.mostRentableItems(query);
    }


}
