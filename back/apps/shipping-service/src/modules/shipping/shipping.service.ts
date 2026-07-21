import { Inject, Injectable } from '@nestjs/common';
import { ShippingRepository } from './shipping.repository';
import { OrderStatus, ShippingStatus } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';

@Injectable()
export class ShippingService {
    constructor(
        private shippingRepository: ShippingRepository,
        @Inject('ORDERS_EVENTS') private orderEvents: ClientProxy,
    ) { }

    async create(orderId: number) {
        const existingShipping = await this.shippingRepository.findByOrderId(orderId)

        if (existingShipping) {
            throw new AppRpcException(404, 'Order already shipped.');
        }

        await this.shippingRepository.create({
            orderId,
            trackingCode: "TESTE123",
            carrier: "Teste",
            status: ShippingStatus.SHIPPED
        })
    }

    async deliver(id: number) {
        const result = await this.shippingRepository.update(id, { status: ShippingStatus.DELIVERED })

        this.orderEvents.emit("updateOrderStatus", { id: result.orderId, status: OrderStatus.FINISHED })
    }
}
