import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentProviderFactory } from './providers/payment-provider.factory';
import { PagBankProvider } from './providers/pagbank/pagbank.provider';
import { StripeProvider } from './providers/stripe/stripe.provider';
import { StripeClient } from './providers/stripe/stripe.client';
import { StripeMapper } from './providers/stripe/stripe.mapper';
import { PaymentRepository } from './payment.repository';

@Module({
	controllers: [PaymentController],
	providers: [
		PaymentService, 
		PaymentRepository,
		PaymentProviderFactory,
		PagBankProvider, 
		StripeProvider,
		StripeClient,
		StripeMapper,
	],
	imports: [
		ClientsModule.register([
			{
				name: 'ORDERS_EVENTS',
				transport: Transport.RMQ,
				options: {
					urls: [process.env.RABBITMQ_URL || ''],
					queue: 'orders_events_queue',
					queueOptions: {
						durable: true,
					},
				},
			},
		]),
	]
})

export class PaymentModule { }
