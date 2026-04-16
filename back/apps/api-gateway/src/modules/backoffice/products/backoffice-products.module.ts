import { Module } from '@nestjs/common';
import { BackofficeProductsController } from './backoffice-products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    providers: [BackofficeProductsModule],
	controllers: [BackofficeProductsController],
	imports: [
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
export class BackofficeProductsModule { }
