import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [CustomersController],
	providers: [CustomersService],
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
export class CustomersModule { }
