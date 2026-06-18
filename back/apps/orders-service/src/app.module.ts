import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './modules/orders/orders.module';
import { OrdersPaymentsModule } from './modules/orders-payments/orders-payments.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DatabaseModule,
		OrdersModule,
		OrdersPaymentsModule
	],
})
export class OrdersServiceModule { }
