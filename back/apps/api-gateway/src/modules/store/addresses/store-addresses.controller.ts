import { Body, Controller, Get, HttpException, Inject, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { CurrentUser } from 'apps/api-gateway/src/common/decorators/current-user.decorator';
import { CreateCustomerOrderDto } from '@app/common/dto/orders/create-customer-order.dto';
import { CreateAddressDto } from '@app/common/dto/addresses/create-address.dto';

@Controller('store/addresses')
export class StoreAddressesController {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async authAddresses(@Req() req) {
        const user = req.user
        try {
            return await lastValueFrom(
                this.client.send('getAddresses', user),
            );
        } catch (error: any) {
            console.log(error)
            if (error?.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            }

            throw new HttpException(
                error,
                500,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @CurrentUser('id') userId: number,
        @Body() dto: CreateAddressDto
    ) {
        return this.client.send('createAddress', {
            userId,
            dto
        });
    }
}
