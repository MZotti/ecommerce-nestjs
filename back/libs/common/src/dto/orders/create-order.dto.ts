import { IsNotEmpty, IsNumber } from "class-validator";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {
    @IsNotEmpty({ message: 'User required' })
    @IsNumber()
    userId!: number;

    @IsNotEmpty({ message: 'Items required' })
    items!: OrderItemDto[]
}