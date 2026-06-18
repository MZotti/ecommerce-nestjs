import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";
import { PaymentType } from "@prisma/client";

export class CreatePaymentCardDto {
    @IsEnum(PaymentType)
    @IsNotEmpty()
    type!: PaymentType;

    @IsString()
    @IsNotEmpty()
    brand!: string;

    @IsString()
    @IsNotEmpty()
    cardNumber!: string;

    @IsString()
    @IsNotEmpty()
    cvv!: string;

    @IsString()
    @IsNotEmpty()
    holderName!: string;

    @IsInt()
    @Min(1)
    @Max(12)
    @IsNotEmpty()
    expiresMonth!: number;

    @IsInt()
    @Min(2000)
    @IsNotEmpty()
    expiresYear!: number;

    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;
}
