import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { createLogger } from '@app/common/logger/logger.config';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(AuthServiceModule, {
		logger: WinstonModule.createLogger({
			instance: createLogger('auth-service'),
		}),
		transport: Transport.TCP,
		options: {
			host: '0.0.0.0',
			port: 3001,
		},
	});

	await app.listen();
}
bootstrap();
