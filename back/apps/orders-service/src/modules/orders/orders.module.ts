import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [OrdersController],
	providers: [OrdersService, OrdersRepository],
	imports: [
		ClientsModule.register([
			{
				name: 'PRODUCTS_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'products-service',
					port: 3002,
				},
			},
			{
				name: 'EVENT_BUS',
				transport: Transport.RMQ,
				options: {
					urls: [process.env.RABBITMQ_URL || ''],
					queue: 'products_events_queue',
					queueOptions: {
						durable: true,
					},
				},
			}
		]),
	]
})
export class OrdersModule { }
