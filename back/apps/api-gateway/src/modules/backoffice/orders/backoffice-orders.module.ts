import { Module } from '@nestjs/common';
import { BackofficeOrdersController } from './backoffice-orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	providers: [BackofficeOrdersModule],
	controllers: [BackofficeOrdersController],
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
export class BackofficeOrdersModule { }
