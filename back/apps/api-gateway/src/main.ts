import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { createLogger } from '@app/common/logger/logger.config';

async function bootstrap() {
	const app = await NestFactory.create(ApiGatewayModule, {
		logger: WinstonModule.createLogger({
			instance: createLogger('api-gateway'),
		}),
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.enableCors();

	await app.listen(3000);
}
bootstrap();
