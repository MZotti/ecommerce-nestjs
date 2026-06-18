import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { CustomersModule } from './modules/customers/customers.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { PaymentCardsModule } from './modules/payment-cards/payment-cards.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DatabaseModule,
		AuthModule,
		UsersModule,
		CustomersModule,
		AddressesModule,
		PaymentCardsModule
	],
})
export class AuthServiceModule { }
