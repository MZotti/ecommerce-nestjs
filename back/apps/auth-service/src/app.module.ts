import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';

console.log("")

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
		DatabaseModule
	],
})

export class AuthServiceModule { }
