import { IsNotEmpty, IsNumber } from "class-validator";
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
}