import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtStrategy } from './modules/jwt/jwt.strategy';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
	imports: [
		AuthModule,
		ProductsModule,
		ClientsModule.register([
			{
				name: 'AUTH_SERVICE',
				transport: Transport.TCP,
				options: {
					port: 3001,
				},
			},
			{
				name: 'PRODUCTS_SERVICE',
				transport: Transport.TCP,
				options: {
					port: 3002,
				},
			},
		]),
	],
	providers: [JwtStrategy]
})
export class ApiGatewayModule { }
