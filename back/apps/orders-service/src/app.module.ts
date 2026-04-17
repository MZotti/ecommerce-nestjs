import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DatabaseModule,
		OrdersModule
	],
})
export class OrdersServiceModule { }
