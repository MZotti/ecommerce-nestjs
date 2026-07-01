import { CreatePaymentCardDto } from '@app/common/dto/payments/create-payment-card.dto';
import { Body, Controller, Delete, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CurrentUser } from 'apps/api-gateway/src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'apps/api-gateway/src/common/jwt/jwt-auth.guard';
import { lastValueFrom } from 'rxjs';
import { handleRpcError } from 'apps/api-gateway/src/common/utils/handle-rpc-error.util';
import { RolesGuard } from 'apps/api-gateway/src/common/jwt/roles.guard';
import { Roles } from 'apps/api-gateway/src/common/decorators/roles.decorator';

@Controller('store/payment-cards')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('CUSTOMER')
export class StorePaymentCardsController {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async authAddresses(@Req() req) {
        const user = req.user;
        return lastValueFrom(
            this.client.send('findAllPaymentCards', user),
        ).catch(handleRpcError);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @CurrentUser('id') userId: number,
        @Body() dto: CreatePaymentCardDto
    ) {
        return this.client.send('createPaymentCard', { userId, dto });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(
        @CurrentUser('id') userId: number,
        @Param('id') id: number
    ) {
        return this.client.send('deletePaymentCard', { userId, cardId: id });
    }
}
