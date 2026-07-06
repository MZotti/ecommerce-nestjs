import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ProductsServiceModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { createLogger } from '@app/common/logger/logger.config';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(ProductsServiceModule, {
		logger: WinstonModule.createLogger({
			instance: createLogger('auth-service'),
		}),
		transport: Transport.TCP,
		options: {
			host: '0.0.0.0',
			port: 3002,
		},
	});

	const eventApp = await NestFactory.createMicroservice(ProductsServiceModule, {
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RABBITMQ_URL],
			queue: 'products_events_queue',
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
