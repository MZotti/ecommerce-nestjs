import { Module } from '@nestjs/common';
import { OrdersPaymentsService } from './orders-payments.service';
import { OrdersPaymentsRepository } from './orders-payments.repository';

@Module({
    providers: [OrdersPaymentsService, OrdersPaymentsRepository],
    exports: [OrdersPaymentsService]
})
export class OrdersPaymentsModule {}
