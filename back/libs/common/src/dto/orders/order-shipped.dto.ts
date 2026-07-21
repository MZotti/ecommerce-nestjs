import { PaymentMethod } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class OrderShippedDto {
    @IsNotEmpty({ message: 'id required' })
    @IsNumber()
    id!: number;
}