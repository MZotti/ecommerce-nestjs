import { CreateAddressDto } from '@app/common/dto/addresses/create-address.dto';
import { Injectable } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import { UpdateAddressDto } from '@app/common/dto/addresses/update-address-dto';

@Injectable()
export class AddressesService {
    constructor(private addressesRepository: AddressesRepository) { }

    async get(userId: number) {
        return await this.addressesRepository.findByUserId(userId);
    }

    async create(userId: number, dto: CreateAddressDto) {
        const existingAddresses = await this.addressesRepository.countByUserId(userId);
        const isDefault = existingAddresses === 0;

        return await this.addressesRepository.create({ userId, isDefault, ...dto });
    }

    async update(userId: number, id: number, dto: UpdateAddressDto) {
        const existingAddress = await this.addressesRepository.findAddress(userId, id);

        if(!existingAddress) {
            throw new AppRpcException(404, 'Address not found');
        }

        return await this.addressesRepository.update(id, dto);
    }

    async default(userId: number, addressId: number) {
        await this.addressesRepository.unsetDefault(userId);

        return await this.addressesRepository.setAsDefault(userId, addressId)
    }

    async delete(userId: number, addressId: number) {
        const existingAddress = await this.addressesRepository.findAddress(userId, addressId);

        if(!existingAddress) {
            throw new AppRpcException(404, 'Address not found');
        }

        if(existingAddress.isDefault) {
            throw new AppRpcException(402, 'Cannot delete default address');
        }

        return await this.addressesRepository.delete(userId, addressId);
    }
}