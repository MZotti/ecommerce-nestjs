import { Controller } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/users/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/users/update-user.dto';
import { CreateCustomerDto } from '@app/common/dto/customers/create-customer.dto';
import { CreateAddressDto } from '@app/common/dto/addresses/create-address.dto';
import { UpdateAddressDto } from '@app/common/dto/addresses/update-address-dto';

@Controller('customers')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService
    ) { }

    @MessagePattern('getAddresses')
    async authAddresses(@Payload() payload: { userId: number }) {
        const { userId } = payload;

        return this.addressesService.get(userId);
    }

    @MessagePattern('createAddress')
    async create(@Payload() payload: { userId: number, dto: CreateAddressDto }) {
        const { userId, dto } = payload;

        return this.addressesService.create(userId, dto);
    }

    @MessagePattern('updateAddress')
    async update(@Payload() payload: { userId: number, id: number, dto: UpdateAddressDto }) {
        const { userId, id, dto } = payload;

        return this.addressesService.update(userId, id, dto);
    }

    @MessagePattern('defaultAddress')
    async default(@Payload() payload: { userId: number, addressId: number }) {
        const { userId, addressId } = payload;

        return this.addressesService.default(userId, addressId);
    }

    @MessagePattern('deleteAddress')
    async delete(@Payload() payload: { userId: number, addressId: number }) {
        const { userId, addressId } = payload;

        return this.addressesService.delete(userId, addressId);
    }

}
