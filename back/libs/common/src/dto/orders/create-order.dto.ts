import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { OrderItemDto } from "./order-item.dto";
import { PaymentMethod } from "@prisma/client";

export class CreateOrderDto {
    @IsNotEmpty({ message: 'User required' })
    @IsNumber()
    userId!: number;

    @IsNotEmpty({ message: 'Items required' })
    items!: OrderItemDto[]

    @IsNotEmpty({ message: 'Payment method required' })
    paymentMethod!: PaymentMethod

    @IsString()
    @IsNotEmpty()
    shippingZipCode!: string;

    @IsString()
    @IsNotEmpty()
    shippingStreet!: string;

    @IsString()
    @IsNotEmpty()
    shippingNumber!: string;

    @IsString()
    @IsOptional()
    shippingComplement?: string;

    @IsString()
    @IsNotEmpty()
    shippingNeighborhood!: string;

    @IsString()
    @IsNotEmpty()
    shippingCity!: string;

    @IsString()
    @IsNotEmpty()
    shippingState!: string;

    @IsString()
    @IsNotEmpty()
    shippingCountry!: string;
}