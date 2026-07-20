import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

@Injectable()
export class StripeClient {
    private readonly stripe: Stripe;

    constructor(private readonly config: ConfigService) {
        this.stripe = new Stripe(
            this.config.get<string>('STRIPE_SECRET_KEY')!,
            {
                apiVersion: '2026-06-24.dahlia',
            },
        );
    }

    async createPaymentMethod(params: Stripe.PaymentMethodAttachParams) {
        return this.stripe.paymentMethods.create({
            type: 'card',
            card: {
                
            }
        });
    }

    async createPaymentIntent(params: Stripe.PaymentIntentCreateParams) {
        return this.stripe.paymentIntents.create(params);
    }

    async getPaymentIntent(transactionId: string) {
        return this.stripe.paymentIntents.retrieve(transactionId);
    }

    async confirmPaymentIntent(transctionId: string, params?: Stripe.PaymentIntentConfirmParams) {
        return this.stripe.paymentIntents.confirm(transctionId, params)
    }

    async cancelPaymentIntent(transactionId: string) {
        return this.stripe.paymentIntents.cancel(transactionId);
    }
}