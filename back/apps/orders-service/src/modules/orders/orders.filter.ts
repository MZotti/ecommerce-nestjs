import { OrderPaginationDto } from "@app/common/dto/orders/order-pagination.dto";
import { Prisma, PaymentMethod, OrderStatus } from "@prisma/client";

export class OrdersFilter {
    static build(
        query: OrderPaginationDto,
    ): Prisma.OrderWhereInput {

        const where: Prisma.OrderWhereInput = {};

        if (query.shippingCountry) {
            where.shippingCountry = query.shippingCountry
        }

        if (query.shippingState) {
            where.shippingState = query.shippingState
        }

        if (query.paymentMethod) {
            where.paymentMethod = PaymentMethod[query.paymentMethod];
        }

        if (query.status) {
            where.status = OrderStatus[query.status];
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