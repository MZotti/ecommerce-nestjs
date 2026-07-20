import { OrderCreatedDto } from "@app/common/dto/orders/order-created.dto";
import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeMapper {
    toPaymentIntent(
        order: OrderCreatedDto,
    ): Stripe.PaymentIntentCreateParams {

        return {
            amount: order.total * 100,
            currency: 'usd',
            description: "Teste",
            metadata: {
                orderId: order.id.toString(),
            },
            automatic_payment_methods: {
                enabled: true,
            },
            payment_method: "pm_card_visa",
        };
    }
}