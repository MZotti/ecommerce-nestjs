import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [AnalyticsController],
	providers: [AnalyticsService],
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
			{
				name: 'ORDERS_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'orders-service',
					port: 3003,
				},
			},
		]),
	]
})
export class AnalyticsModule { }
