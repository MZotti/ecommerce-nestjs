import { Injectable } from '@nestjs/common';
import { ShippingRepository } from './shipping.repository';

@Injectable()
export class ShippingService {
    constructor(
        private shippingRepository: ShippingRepository,
    ) { }

    async create(data: any) {

    }
}
