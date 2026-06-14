import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class IncreaseProductStockDto {
    @IsNotEmpty({ message: 'Quantity required' })
    @IsNumber()
    quantity!: number;
}