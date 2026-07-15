import { ProductAnalyticsDto } from "@app/common/dto/analytics/product-analytics.dto";
import { ProductPaginationDto } from "@app/common/dto/products/product-pagination.dto";
import { Prisma, PaymentMethod, OrderStatus } from "@prisma/client";

export class ProductsFilter {
    static build(
        query: ProductPaginationDto,
    ): Prisma.ProductWhereInput {

        const where: Prisma.ProductWhereInput = {};

        if (query.search) {
            where.name = { contains: query.search, mode: 'insensitive' };
        }

        if (query.category) {
            where.category = {
                slug: query.category
            }
        }

        if (query.stock) {
            const stock = query.stock
            if (stock == "good") {
                where.stock = {
                    gt: 10,
                }
            } else if (stock == "low") {
                where.stock = {
                    gt: 0,
                    lte: 10
                }
            } else if (stock == "empty") {
                where.stock = 0
            }
        }

        if (query.priceFrom || query.priceTo) {
            where.price = {}

            if (query.priceFrom) {
                where.price.gte = query.priceFrom
            }

            if (query.priceTo) {
                where.price.lte = query.priceTo
            }
        }

        if (query.createdAtStart || query.createdAtEnd) {
            where.createdAt = {}

            if (query.createdAtStart) {
                where.createdAt.gte = new Date(`${query.createdAtStart} 00:00:00`)
            }

            if (query.createdAtEnd) {
                where.createdAt.lte = new Date(`${query.createdAtEnd} 23:59:59`)
            }
        }

        return where;
    }

    static buildAnalytics(
        query: ProductAnalyticsDto,
    ): Prisma.ProductWhereInput {

        const where: Prisma.ProductWhereInput = {};

        if (query.category) {
            where.category = {
                slug: query.category
            }
        }

        if (query.createdAtStart || query.createdAtEnd) {
            where.createdAt = {}

            if (query.createdAtStart) {
                where.createdAt.gte = new Date(`${query.createdAtStart} 00:00:00`)
            }

            if (query.createdAtEnd) {
                where.createdAt.lte = new Date(`${query.createdAtEnd} 23:59:59`)
            }
        }

        return where;
    }
}