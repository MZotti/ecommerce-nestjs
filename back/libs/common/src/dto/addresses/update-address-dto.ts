import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAddressDto {
    @IsNumber()
    @IsOptional()
    userId?: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    zipCode!: string;

    @IsString()
    @IsNotEmpty()
    street!: string;

    @IsString()
    @IsNotEmpty()
    number!: string;

    @IsString()
    @IsOptional()
    complement?: string;

    @IsString()
    @IsNotEmpty()
    neighborhood!: string;

    @IsString()
    @IsNotEmpty()
    city!: string;

    @IsString()
    @IsNotEmpty()
    state!: string;

    @IsString()
    @IsNotEmpty()
    country!: string;

    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    update?: Date;
}