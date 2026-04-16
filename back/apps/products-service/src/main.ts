import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ProductsServiceModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(ProductsServiceModule, {
		transport: Transport.TCP,
		options: {
			port: 3002,
		},
	});

	await app.listen();
}

bootstrap();
