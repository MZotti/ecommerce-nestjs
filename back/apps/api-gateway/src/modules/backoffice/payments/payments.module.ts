import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	controllers: [PaymentsController],
	imports: [
		ClientsModule.register([
			{
				name: 'PAYMENTS_SERVICE',
				transport: Transport.TCP,
				options: {
					host: 'payments-service',
					port: 3005,
				},
			}
		]),
	]
})
export class PaymentsModule { }
