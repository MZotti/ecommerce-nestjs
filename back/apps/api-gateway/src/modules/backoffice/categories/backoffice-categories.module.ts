import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BackofficeCategoriesController } from './backoffice-categories.controller';

@Module({
	providers: [BackofficeCategoriesModule],
	controllers: [BackofficeCategoriesController],
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
export class BackofficeCategoriesModule { }
