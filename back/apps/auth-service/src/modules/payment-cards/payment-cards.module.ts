import { Module } from '@nestjs/common';
import { PaymentCardsController } from './payment-cards.controller';
import { PaymentCardsService } from './payment-cards.service';
import { PaymentCardsRepository } from './payment-cards.repository';

@Module({
  controllers: [PaymentCardsController],
  providers: [PaymentCardsService, PaymentCardsRepository]
})
export class PaymentCardsModule {}
