import { PaymentMethod, PaymentProvider } from "@prisma/client";
import { PagBankProvider } from "./pagbank/pagbank.provider";
import { Injectable } from "@nestjs/common";
import { StripeProvider } from "./stripe/stripe.provider";

@Injectable()
export class PaymentProviderFactory {
    constructor(
        private readonly pagBank: PagBankProvider,
        private readonly stripe: StripeProvider,
    ) { }

    getProvider(provider: PaymentProvider) {
        return this.stripe
        // switch (provider) {
        //     case "STRIPE":
        //         return this.stripe;
        // }
    }

    getProviderByPaymentMethod(method: PaymentMethod) {
        switch (method) {
            case PaymentMethod.CREDIT:
            case PaymentMethod.DEBIT:
            case PaymentMethod.PIX:
            case PaymentMethod.PAYMENT_ORDER:
                return this.stripe;
            default:
                throw new Error("Invalid payment method");
        }
    }
}