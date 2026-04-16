import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [ProductsController],
	imports: [
		ProductsModule,
		ClientsModule.register([
			{
				name: 'PRODUCTS_SERVICE',
				transport: Transport.TCP,
				options: {
					port: 3002,
				},
			},
		])
	]
})
export class ProductsModule { }
