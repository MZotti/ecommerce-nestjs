import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StoreAddressesController } from './store-addresses.controller';

@Module({
	controllers: [StoreAddressesController],
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
export class StoreAddressesModule { }
