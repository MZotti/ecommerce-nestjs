import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShippingModule } from './modules/shipping/shipping.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DatabaseModule,
		ShippingModule,
	],
})

export class ShippingServiceModule { }
