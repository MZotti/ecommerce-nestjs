import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StoreOrdersController } from './store-orders.controller';

@Module({
	controllers: [StoreOrdersController],
	imports: [
		ClientsModule.register([
			{
				name: 'ORDERS_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'orders-service',
					port: 3003,
				},
			}
		]),
	]
})
export class StoreOrdersModule { }
