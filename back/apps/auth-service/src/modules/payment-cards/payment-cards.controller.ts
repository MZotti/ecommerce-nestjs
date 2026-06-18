import { Controller } from '@nestjs/common';
import { PaymentCardsService } from './payment-cards.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePaymentCardDto } from '@app/common/dto/payments/create-payment-card.dto';

@Controller('payment-cards')
export class PaymentCardsController {
    constructor(
        private readonly paymentCardsService: PaymentCardsService
    ) { }

    @MessagePattern('findAllPaymentCards')
    async findAll(@Payload() payload: { userId: number }) {
        return this.paymentCardsService.findAll(payload);
    }

    @MessagePattern('createPaymentCard')
    async create(@Payload() payload: { userId: number, dto: CreatePaymentCardDto }) {
        return this.paymentCardsService.create(payload);
    }

    @MessagePattern('deletePaymentCard')
    async delete(@Payload() payload: { userId: string; cardId: number }) {
        const data = {
            userId: Number(payload.userId),
            cardId: payload.cardId
        }

        return this.paymentCardsService.delete(data);
    }
}
