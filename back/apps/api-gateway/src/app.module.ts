import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtStrategy } from './modules/jwt/jwt.strategy';
import { AuthModule } from './modules/auth/auth.module';

@Module({
	imports: [
		AuthModule,
		ClientsModule.register([
			{
				name: 'AUTH_SERVICE',
				transport: Transport.TCP,
				options: {
					port: 3001,
				},
			},
		]),
	],
	providers: [JwtStrategy]
})
export class ApiGatewayModule { }
