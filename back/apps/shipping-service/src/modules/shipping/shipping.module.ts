import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { ShippingRepository } from './shipping.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [ShippingController],
	providers: [ShippingService, ShippingRepository],
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
		])

	]
})
export class ShippingModule { }
