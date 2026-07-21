import { Controller } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('shipping')
export class ShippingController {
    constructor(
        private readonly shippingService: ShippingService
    ) { }

    @MessagePattern("orderShipped")
    async orderShipped(
        @Payload() data: { id: number }
    ) {
        const { id } = data;

        return this.shippingService.create(id);
    }
}
