import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { PaymentsServiceModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { Transport } from '@nestjs/microservices';
import { createLogger } from '@app/common/logger/logger.config';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(PaymentsServiceModule, {
		logger: WinstonModule.createLogger({
			instance: createLogger('payments-service'),
		}),
		transport: Transport.TCP,
		options: {
			host: '0.0.0.0',
			port: 3005,
		},
	});

	const eventApp = await NestFactory.createMicroservice(PaymentsServiceModule, {
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RABBITMQ_URL],
			queue: 'payments_events_queue',
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
