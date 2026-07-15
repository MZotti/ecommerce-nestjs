import { Module } from '@nestjs/common';
import { OrdersItemsService } from './orders-items.service';
import { OrdersItemsController } from './orders-items.controller';
import { OrdersItemsRepository } from './orders-items.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	providers: [OrdersItemsService, OrdersItemsRepository],
	controllers: [OrdersItemsController],
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
		]),
	]
})
export class OrdersItemsModule { }
