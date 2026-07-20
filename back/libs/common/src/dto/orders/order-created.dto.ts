import { PaymentMethod } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class OrderCreatedDto {
    @IsNotEmpty({ message: 'id required' })
    @IsNumber()
    id!: number;

    @IsNotEmpty({ message: 'PaymentMethod required' })
    @IsEnum(PaymentMethod)
    paymentMethod!: PaymentMethod;

    @IsNotEmpty({ message: 'total required' })
    @IsEnum(PaymentMethod)
    total!: number;
}