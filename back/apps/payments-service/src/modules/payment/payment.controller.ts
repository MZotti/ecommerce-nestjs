import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { OrderCreatedDto } from '@app/common/dto/orders/order-created.dto';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService
    ) { }

    @MessagePattern("paymentIntent")
    async paymentIntent(
        @Payload() data: any
    ) {
        return this.paymentService.paymentIntent(data);
    }

    @EventPattern('orderCreated')
    async orderCreated(@Payload() data: OrderCreatedDto, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();

        try {
            this.paymentService.createPayment(data);
            channel.ack(message);
        } catch (error) {
            channel.nack(message);
        }
    }
}
