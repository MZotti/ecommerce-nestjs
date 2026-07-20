import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { JwtStrategy } from './common/jwt/jwt.strategy';
import { AuthModule } from './modules/auth/auth.module';

import { BackofficeUsersModule } from './modules/backoffice/users/backoffice-users.module';
import { BackofficeCustomersModule } from './modules/backoffice/customers/backoffice-customers.module';
import { BackofficeProductsModule } from './modules/backoffice/products/backoffice-products.module';
import { BackofficeCategoriesModule } from './modules/backoffice/categories/backoffice-categories.module';
import { BackofficeOrdersModule } from './modules/backoffice/orders/backoffice-orders.module';

import { AnalyticsModule } from './modules/backoffice/analytics/analytics.module';

import { StoreProductsModule } from './modules/store/products/store-products.module';
import { StoreOrdersModule } from './modules/store/orders/store-orders.module';
import { StoreAddressesModule } from './modules/store/addresses/store-addresses.module';
import { StorePaymentCardsModule } from './modules/store/payment-cards/store-payment-cards.module';
import { PaymentsModule } from './modules/backoffice/payments/payments.module';


@Module({
	imports: [
		AuthModule,

		BackofficeUsersModule,
		BackofficeCustomersModule,
		BackofficeProductsModule,
		BackofficeCategoriesModule,
		BackofficeOrdersModule,

		AnalyticsModule,
		PaymentsModule,

		StoreProductsModule,
		StoreOrdersModule,
		StoreAddressesModule,
		StorePaymentCardsModule,

		ClientsModule.register([
			{
				name: 'AUTH_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'auth-service',
					port: 3001,
				},
			},
			{
				name: 'PRODUCTS_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'products-service',
					port: 3002,
				},
			},
			{
				name: 'ORDERS_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'orders-service',
					port: 3003,
				},
			},
			{
				name: 'ANALYTICS_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'analytics-service',
					port: 3004,
				},
			},
			{
				name: 'PAYMENTS_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'payments-service',
					port: 3005,
				},
			},
		]),
	],
	providers: [JwtStrategy]
})
export class ApiGatewayModule { }
