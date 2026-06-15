import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { CurrentUser } from 'apps/api-gateway/src/common/decorators/current-user.decorator';
import { CreateAddressDto } from '@app/common/dto/addresses/create-address.dto';
import { handleRpcError } from '../../../common/utils/handle-rpc-error.util';

@Controller('store/addresses')
export class StoreAddressesController {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async authAddresses(@Req() req) {
        const user = req.user;
        return lastValueFrom(
            this.client.send('getAddresses', user),
        ).catch(handleRpcError);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @CurrentUser('id') userId: number,
        @Body() dto: CreateAddressDto
    ) {
        return this.client.send('createAddress', { userId, dto });
    }
}
