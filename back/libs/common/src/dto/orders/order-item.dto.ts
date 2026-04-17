import { IsNotEmpty, IsNumber } from "class-validator";

export class OrderItemDto {
    @IsNotEmpty({ message: 'Product required' })
    @IsNumber()
    productId!: number;

    @IsNotEmpty({ message: 'Quantity required' })
    @IsNumber()
    quantity!: number;
}