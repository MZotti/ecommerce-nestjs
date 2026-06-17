import { CreateAddressDto } from '@app/common/dto/addresses/create-address.dto';
import { Injectable } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';

@Injectable()
export class AddressesService {
    constructor(private addressesRepository: AddressesRepository) { }

    async get(userId: number) {
        return this.addressesRepository.findByUserId(userId);
    }

    async create(userId: number, dto: CreateAddressDto) {
        const existingAddresses = await this.addressesRepository.countByUserId(userId);
        const isDefault = existingAddresses === 0;

        return this.addressesRepository.create({ userId, isDefault, ...dto });
    }
}