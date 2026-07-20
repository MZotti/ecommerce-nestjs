import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ShippingServiceModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { createLogger } from '@app/common/logger/logger.config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(ShippingServiceModule, {
		logger: WinstonModule.createLogger({
			instance: createLogger('shipping-service'),
		}),
		transport: Transport.TCP,
		options: {
			host: '0.0.0.0',
			port: 3006,
		},
	});

	const eventApp = await NestFactory.createMicroservice(ShippingServiceModule, {
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RABBITMQ_URL],
			queue: 'shipping_events_queue',
			noAck: false,
			queueOptions: {
				durable: true,
			},
		},
	});

	await app.listen();
	await eventApp.listen();
}
bootstrap();
