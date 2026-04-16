import { Module } from '@nestjs/common';
import { BackofficeUsersController } from './backoffice-users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    providers: [BackofficeUsersModule],
    controllers: [BackofficeUsersController],
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.TCP,
                options: {
                    port: 3001,
                },
            },
        ])
    ]
})
export class BackofficeUsersModule { }
