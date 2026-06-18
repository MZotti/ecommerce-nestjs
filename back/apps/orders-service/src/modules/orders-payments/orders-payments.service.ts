import { Injectable } from '@nestjs/common';
import { OrdersPaymentsRepository } from './orders-payments.repository';

@Injectable()
export class OrdersPaymentsService {
    constructor(
        private ordersPaymentRepository: OrdersPaymentsRepository,
    ) { }

    async create(data: { orderId: number, cardBrand: string, cardNumber: string, holderName: string, expiresMonth: number, expiresYear: number }) {
        const { orderId, cardBrand, cardNumber, holderName, expiresMonth, expiresYear } = data
        const cardToken = "token_123"

        return await this.ordersPaymentRepository.create({
            orderId,
            cardToken,
            cardBrand,
            cardLast4: cardNumber,
            cardHolderName: holderName,
            cardExpiresMonth: expiresMonth,
            cardExpiresYear: expiresYear,
        })
    }
}
