import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { CurrentUser } from 'apps/api-gateway/src/common/decorators/current-user.decorator';
import { CreateAddressDto } from '@app/common/dto/addresses/create-address.dto';
import { handleRpcError } from '../../../common/utils/handle-rpc-error.util';
import { UpdateAddressDto } from '@app/common/dto/addresses/update-address-dto';

@Controller('store/addresses')
export class StoreAddressesController {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async authAddresses(@CurrentUser('id') userId: number) {
        return this.client.send('getAddresses', { userId });
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @CurrentUser('id') userId: number,
        @Body() dto: CreateAddressDto
    ) {
        return this.client.send('createAddress', { userId, dto });
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @CurrentUser('id') userId: number,
        @Param('id') addressId: number,
        @Body() dto: UpdateAddressDto
    ) {
        return this.client.send('updateAddress', { userId, id: addressId, dto });
    }

    @UseGuards(JwtAuthGuard)
    @Patch('default/:id')
    async default(
        @CurrentUser('id') userId: number,
        @Param('id') addressId: number
    ) {
        return this.client.send('defaultAddress', { userId, addressId });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(
        @CurrentUser('id') userId: number,
        @Param('id') addressId: number
    ) {
        return this.client.send('deleteAddress', { userId, addressId });
    }
}
