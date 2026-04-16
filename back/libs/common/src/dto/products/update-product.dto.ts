import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateProductDto {
    @IsNotEmpty({ message: 'Category required' })
    @IsNumber()
    categoryId!: number;

    @IsNotEmpty({ message: 'Name required' })
    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsNotEmpty({ message: 'Price required' })
    @IsNumber()
    price!: number;

    @IsNotEmpty({ message: 'Stock required' })
    @IsNumber()
    stock!: number;
}