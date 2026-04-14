import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(AuthServiceModule, {
		transport: Transport.TCP,
		options: {
			port: 3001,
		},
	});

	await app.listen();
}

bootstrap();
