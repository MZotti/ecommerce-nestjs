import { Injectable } from "@nestjs/common";
import { PaymentProvider } from "../payment-provider.interface";
import { OrderCreatedDto } from "@app/common/dto/orders/order-created.dto";
import { randomUUID } from "crypto";
import { PaymentProvider as PaymentEnum, PaymentStatus } from "@prisma/client";

@Injectable()
export class PagBankProvider implements PaymentProvider {
    async createPayment(order: OrderCreatedDto) {
        return {
            orderId: order.id,
            provider: PaymentEnum.PAGBANK,
            transactionId: randomUUID(),
            externalReference: "Teste",
            status: PaymentStatus.PAYMENT_CREATED,
            amount: order.total
        };
    }

    confirmPayment(args1: string) {
        
    }

    cancelPayment() {

    }

    getPayment() {

    }

    refundPayment() {

    }
}