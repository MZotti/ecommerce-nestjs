import { Controller } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductAnalyticsDto } from '@app/common/dto/analytics/product-analytics.dto';
import { OrderAnalyticsDto } from '@app/common/dto/analytics/order-analytics.dto';

@Controller('analytics')
export class AnalyticsController {
    constructor(
        private readonly analyticsService: AnalyticsService
    ) { }

    @MessagePattern('getProductsAnalytics')
    async getProducsAnalytics(@Payload() payload: { query: ProductAnalyticsDto }) {
        const { query } = payload;

        return this.analyticsService.getProductsAnalytics(query);
    }

    @MessagePattern('getOrdersAnalytics')
    async getOrdersAnalytics(@Payload() payload: { query: OrderAnalyticsDto }) {
        const { query } = payload;

        return this.analyticsService.getOrdersAnalytics(query);
    }
}
