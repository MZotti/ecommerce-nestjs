import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { createLogger } from '@app/common/logger/logger.config';
import { AnalyticsServiceModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(AnalyticsServiceModule, {
		logger: WinstonModule.createLogger({
			instance: createLogger('analytics-service'),
		}),
		transport: Transport.TCP,
		options: {
			host: '0.0.0.0',
			port: 3004,
		},
	});

	await app.listen();
}
bootstrap();
