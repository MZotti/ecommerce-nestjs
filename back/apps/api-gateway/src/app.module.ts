import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { JwtStrategy } from './modules/jwt/jwt.strategy';
import { AuthModule } from './modules/auth/auth.module';
import { BackofficeProductsModule } from './modules/backoffice/products/backoffice-products.module';
import { BackofficeCategoriesModule } from './modules/backoffice/categories/backoffice-categories.module';
import { BackofficeUsersModule } from './modules/backoffice/users/backoffice-users.module';
import { BackofficeOrdersModule } from './modules/backoffice/orders/backoffice-orders.module';

@Module({
	imports: [
		AuthModule,
		BackofficeUsersModule,
		BackofficeProductsModule,
		BackofficeCategoriesModule,
		BackofficeOrdersModule,
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
			{
				name: 'ORDERS_SERVICE',
				transport: Transport.TCP,
				options: {
					port: 3003,
				},
			},
		]),
	],
	providers: [JwtStrategy]
})
export class ApiGatewayModule { }
