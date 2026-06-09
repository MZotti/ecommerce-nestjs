import { Module } from '@nestjs/common';
import { BackofficeCustomersController } from './backoffice-customers.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [BackofficeCustomersController],
	imports: [
		ClientsModule.register([
			{
				name: 'AUTH_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'auth-service',
					port: 3001,
				},
			}
		]),
	]
})
export class BackofficeCustomersModule { }
