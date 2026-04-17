import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { OrdersServiceModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(OrdersServiceModule, {
		transport: Transport.TCP,
		options: {
			port: 3003,
		},
	});
	
	await app.listen();
}
bootstrap();
