import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [AnalyticsController],
	imports: [
		ClientsModule.register([
			{
				name: 'ANALYTICS_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'analytics-service',
					port: 3004,
				},
			}
		]),
	]
})
export class AnalyticsModule { }
