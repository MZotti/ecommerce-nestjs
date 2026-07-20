import { Injectable } from "@nestjs/common";
import { PaymentProvider } from "../payment-provider.interface";
import { OrderCreatedDto } from "@app/common/dto/orders/order-created.dto";
import { PaymentProvider as PaymentEnum, PaymentStatus } from "@prisma/client";
import { StripeClient } from "./stripe.client";
import { StripeMapper } from "./stripe.mapper";

@Injectable()
export class StripeProvider implements PaymentProvider {
    constructor(
        private readonly mapper: StripeMapper,
        private readonly client: StripeClient
    ) { }

    async createPayment(order: OrderCreatedDto) {
        const params = this.mapper.toPaymentIntent(order);
        const result = await this.client.createPaymentIntent(params);

        return {
            orderId: order.id,
            provider: PaymentEnum.PAGBANK,
            transactionId: result.id,
            externalReference: "Teste",
            status: PaymentStatus.PAYMENT_CREATED,
            amount: order.total,
        };
    }

    async getPayment(transactionId: string) {
        const result = await this.client.getPaymentIntent(transactionId);

        return result;
    }

    async confirmPayment(transactionId: string) {
        await this.client.confirmPaymentIntent(transactionId, { return_url: "http://localhost:3000" });

        return {
            transactionId: transactionId,
            status: PaymentStatus.PAYMENT_APPROVED
        }
    }

    cancelPayment() {

    }

    refundPayment() {

    }
}