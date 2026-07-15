import { ProductAnalyticsDto } from '@app/common/dto/analytics/product-analytics.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AnalyticsService {
    constructor(
        @Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy,
        @Inject('ORDERS_SERVICE') private ordersClient: ClientProxy
    ) { }

    async getProductsAnalytics(query: ProductAnalyticsDto) {
        const [stock, price, bestSelling, mostRentable] = await Promise.all([
            lastValueFrom(this.productsClient.send('getProductsStock', { query })),
            lastValueFrom(this.productsClient.send('getProductsPrice', { query })),
            lastValueFrom(this.ordersClient.send('getBestSellingItems', { query })),
            lastValueFrom(this.ordersClient.send('getMostRentableItems', { query })),
        ]);

        return {
            price,
            stock,
            bestSelling,
            mostRentable
        };
    }

    async getOrdersAnalytics(query: ProductAnalyticsDto) {
        const [ordersPerMonth, paymentMethods, ordersStatus] = await Promise.all([
            lastValueFrom(this.ordersClient.send('getOrdersPerMonth', { query })),
            lastValueFrom(this.ordersClient.send('getPaymentMethods', { query })),
            lastValueFrom(this.ordersClient.send('getOrdersStatus', { query })),
        ]);

        return {
            ordersPerMonth,
            paymentMethods,
            ordersStatus
        };

    }
}
