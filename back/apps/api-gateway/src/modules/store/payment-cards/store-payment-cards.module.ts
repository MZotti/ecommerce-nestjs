import { Module } from '@nestjs/common';
import { StorePaymentCardsController } from './store-payment-cards.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [StorePaymentCardsController],
	imports: [
		ClientsModule.register([
			{
				name: 'AUTH_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'auth-service',
					port: 3001,
				},
			}
		]),
	]
})
export class StorePaymentCardsModule { }
