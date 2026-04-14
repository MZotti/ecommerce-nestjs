import { NestFactory } from '@nestjs/core';
import { ProductsServiceModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(ProductsServiceModule);
	await app.listen(process.env.port ?? 3002);
}
bootstrap();
