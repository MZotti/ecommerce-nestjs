import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { handleRpcError } from 'apps/api-gateway/src/common/utils/handle-rpc-error.util';
import { lastValueFrom } from 'rxjs';

@Controller('backoffice/payments')
export class PaymentsController {
    constructor(
        @Inject('PAYMENTS_SERVICE') private client: ClientProxy,
    ) { }

    @Post('webhook')
    async paymentIntent(
        @Payload() data: any
    ) {
        return lastValueFrom(
            this.client.send('paymentIntent', data)
        ).catch(handleRpcError);
    }
}
