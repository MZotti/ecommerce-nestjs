import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository],
    imports: [
        ClientsModule.register([
            {
                name: 'EVENT_BUS',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL || ''],
                    queue: 'products_events_queue',
                    queueOptions: {
                        durable: true,
                    },
                },
            }
        ]),
    ]
})
export class ProductsModule { }
