import { Controller } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/users/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/users/update-user.dto';
import { CreateCustomerDto } from '@app/common/dto/customers/create-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(
        private readonly customersService: CustomersService
    ) { }

    @MessagePattern('findAllCustomers')
    async findAll(@Payload() payload: { page: number; perPage: number; search: string }) {
        return this.customersService.findAll(payload);
    }

    @MessagePattern('findCustomer')
    async find(@Payload() payload: { id: string; }) {
        const { id } = payload;

        return this.customersService.find(Number(id));
    }

    @MessagePattern('createCustomer')
    async create(@Payload() dto: CreateCustomerDto) {
        return this.customersService.create(dto);
    }

    // @MessagePattern('updateCustomer')
    // async update(@Payload() payload: { id: string; data: UpdateUserDto }) {
    //     const { id, data } = payload;

    //     return this.customersService.update(Number(id), data);
    // }

    // @MessagePattern('deleteCustomer')
    // async delete(@Payload() payload: { id: string; }) {
    //     const { id } = payload;

    //     return this.customersService.delete(Number(id));
    // }
}
