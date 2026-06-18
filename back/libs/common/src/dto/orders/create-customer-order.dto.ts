import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { OrderItemDto } from "./order-item.dto";
import { PaymentMethod } from "@prisma/client";

export class CreateCustomerOrderDto {
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

    @ValidateIf(object => (object.paymentMethod === 'CREDIT' || object.paymentMethod === 'DEBIT'))
    @IsString()
    @IsNotEmpty()
    cardBrand!: string

    @ValidateIf(object => (object.paymentMethod === 'CREDIT' || object.paymentMethod === 'DEBIT'))
    @IsString()
    @IsNotEmpty()
    cardNumber!: string

    @ValidateIf(object => (object.paymentMethod === 'CREDIT' || object.paymentMethod === 'DEBIT'))
    @IsString()
    @IsNotEmpty()
    cvv!: string

    @ValidateIf(object => (object.paymentMethod === 'CREDIT' || object.paymentMethod === 'DEBIT'))
    @IsString()
    @IsNotEmpty()
    holderName!: string

    @ValidateIf(object => (object.paymentMethod === 'CREDIT' || object.paymentMethod === 'DEBIT'))
    @IsNumber()
    @IsNotEmpty()
    expiresMonth!: number

    @ValidateIf(object => (object.paymentMethod === 'CREDIT' || object.paymentMethod === 'DEBIT'))
    @IsNumber()
    @IsNotEmpty()
    expiresYear!: number
}