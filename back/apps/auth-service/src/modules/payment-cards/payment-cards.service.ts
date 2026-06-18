import { CreatePaymentCardDto } from '@app/common/dto/payments/create-payment-card.dto';
import { UpdatePaymentCardDto } from '@app/common/dto/payments/update-payment-card';
import { Injectable } from '@nestjs/common';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import { PaymentCardsRepository } from './payment-cards.repository';

@Injectable()
export class PaymentCardsService {
    constructor(private paymentCardsRepository: PaymentCardsRepository) { }

    async findAll({ userId }: { userId: number }) {
        return this.paymentCardsRepository.findByUserId(userId);
    }

    async create({ userId, dto }: { userId: number, dto: CreatePaymentCardDto }) {
        const { brand, cardNumber, expiresMonth, expiresYear, holderName, type } = dto;

        return this.paymentCardsRepository.create({
            userId,
            type,
            brand,
            last4: cardNumber.slice(-4),
            expiresMonth,
            expiresYear,
            holderName,
            isDefault: false,
        });
    }

    async update(id: number, dto: UpdatePaymentCardDto) {
        const existingPaymentCard = await this.paymentCardsRepository.findById(id);

        if (!existingPaymentCard) {
            throw new AppRpcException(404, 'Payment card not found');
        }

        return this.paymentCardsRepository.update(id, dto);
    }

    async delete({ userId, cardId }: { userId: number, cardId: number }) {
        const existingCard = await this.paymentCardsRepository.findByIdAndUserId(cardId, userId);

        if (!existingCard) {
            throw new AppRpcException(404, 'Payment card not found');
        }

        return this.paymentCardsRepository.delete(cardId, userId);
    }
}
