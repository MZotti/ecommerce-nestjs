import { Module } from '@nestjs/common';
import { BackofficeProductsController } from './backoffice-products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [BackofficeProductsController],
	imports: [
		ClientsModule.register([
			{
				name: 'PRODUCTS_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'products-service',
					port: 3002,
				},
			}
		]),
	]
})
export class BackofficeProductsModule { }
