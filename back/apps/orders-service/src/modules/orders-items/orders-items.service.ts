import { Inject, Injectable } from '@nestjs/common';
import { OrdersItemsRepository } from './orders-items.repository';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '@app/database/prisma.service';
import { ProductAnalyticsDto } from '@app/common/dto/analytics/product-analytics.dto';
import { OrdersItemsFilter } from './orders-items.filter';

@Injectable()
export class OrdersItemsService {
    constructor(
        private prisma: PrismaService,
        private ordersItemsRepository: OrdersItemsRepository,
        @Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy,
    ) { }

    async bestSellingItems(query: ProductAnalyticsDto) {
        const where = OrdersItemsFilter.buildAnalytics(query);
        const items = await this.ordersItemsRepository.groupByQuantity({ where });

        const productsid = items.map(item => item.productId);
        const products = await lastValueFrom<Product[]>(this.productsClient.send('findManyByIds', productsid));

        return items.map(item => {
            const product = products.find(product => product.id === item.productId)

            return {
                name: product?.name,
                value: item._sum.quantity
            }
        })
    }

    async mostRentableItems(query: ProductAnalyticsDto) {
        const conditions: Prisma.Sql[] = [];

        if (query.category) {
            conditions.push(Prisma.sql`oi."productCategorySlug" = ${query.category}`);
        }

        if (query.createdAtStart) {
            conditions.push(Prisma.sql`o."createdAt" >= ${query.createdAtStart}`);
        }

        if (query.createdAtEnd) {
            conditions.push(Prisma.sql`o."createdAt" <= ${query.createdAtEnd}`);
        }

        const whereClause = conditions.length > 0
            ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
            : Prisma.empty;

        const items: { productId: number, value: number }[] = await this.prisma.$queryRaw`
            SELECT
                "productId",
                SUM(quantity * "price") AS value
            FROM "OrderItem" oi
            INNER JOIN "Order" o
            ON oi."orderId" = o."id"
            ${whereClause}
            GROUP BY "productId"
            ORDER BY value DESC
            LIMIT 5;
        `;

        const productsid = items.map(item => item.productId);
        const products = await lastValueFrom<Product[]>(this.productsClient.send('findManyByIds', productsid));

        return items.map(item => {
            const product = products.find(product => product.id === item.productId)

            return {
                name: product?.name,
                value: item.value
            }
        })
    }
}
