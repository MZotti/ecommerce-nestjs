import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [OrdersController],
	providers: [OrdersService],
	imports: [
		OrdersModule,
		ClientsModule.register([
			{
				name: 'PRODUCTS_SERVICE',
				transport: Transport.TCP,
				options: {
					port: 3002,
				},
			},
		]),
	]
})
export class OrdersModule { }
