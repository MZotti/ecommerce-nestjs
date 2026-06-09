import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { OrdersServiceModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(OrdersServiceModule, {
		transport: Transport.TCP,
		options: {
			host: '0.0.0.0',
			port: 3003,
		},
	});

	const eventApp = await NestFactory.createMicroservice(OrdersServiceModule, {
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RABBITMQ_URL],
			queue: 'orders_events_queue',
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
