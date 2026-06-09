import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StoreProductsController } from './store-products.controller';

@Module({
	controllers: [StoreProductsController],
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
export class StoreProductsModule { }
