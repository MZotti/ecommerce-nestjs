import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentProviderFactory } from './providers/payment-provider.factory';
import { OrderCreatedDto } from '@app/common/dto/orders/order-created.dto';
import { PaymentRepository } from './payment.repository';
import { OrderStatus, PaymentMethod, PaymentStatus } from '@prisma/client';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import { lastValueFrom } from 'rxjs';
import { PaymentIntent, PaymentIntentCanceledEvent, PaymentIntentCreatedEvent, PaymentIntentSucceededEvent } from 'stripe';

@Injectable()
export class PaymentService {
    constructor(
        private paymentRepository: PaymentRepository,
        private providerFactory: PaymentProviderFactory,
        @Inject('ORDERS_EVENTS') private orderEvents: ClientProxy
    ) { }

    async createPayment(data: OrderCreatedDto) {
        const provider = this.providerFactory.getProviderByPaymentMethod(
            data.paymentMethod,
        );

        const result = await provider.createPayment(data);

        await this.paymentRepository.create(result);

        setTimeout(() => {
            this.confirmPayment(result.transactionId)
        }, 3000)
    }

    async confirmPayment(transactionId: string) {
        const provider = this.providerFactory.getProvider('PAGBANK')

        await provider.confirmPayment(transactionId)
    }

    async paymentIntent(data: PaymentIntentSucceededEvent | PaymentIntentCanceledEvent) {
        switch (data.type) {
            case "payment_intent.succeeded":
                this.paymentSucceeded(data);
                break;
            case "payment_intent.canceled":
                this.paymentCanceled(data);
                break;
        }

        return {
            message: "Event received."
        }
    }

    async paymentSucceeded(data: PaymentIntentSucceededEvent) {
        const transactionObject = data.data.object;
        const { id: transactionId } = transactionObject;

        const payment = await this.paymentRepository.findByTransactionId(transactionId)

        if (!payment) {
            throw new AppRpcException(404, 'Payment not found');
        }

        await this.paymentRepository.update(payment.id, { status: PaymentStatus.PAYMENT_APPROVED });

        this.orderEvents.emit('updateOrderStatus', { id: payment.orderId, status: OrderStatus.PAID });
    }

    async paymentCanceled(data: PaymentIntentCanceledEvent) {
        const transactionObject = data.data.object;
        const { id: transactionId } = transactionObject;

        const payment = await this.paymentRepository.findByTransactionId(transactionId)

        if (!payment) {
            throw new AppRpcException(404, 'Payment not found');
        }

        await this.paymentRepository.update(payment.id, { status: PaymentStatus.PAYMENT_FAILED });

        this.orderEvents.emit('updateOrderStatus', { id: payment.orderId, status: OrderStatus.CANCELED });
    }
}
