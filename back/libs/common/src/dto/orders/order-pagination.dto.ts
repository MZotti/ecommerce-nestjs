import { IsOptional } from "class-validator";
import { PaginationDto } from "../pagination.dto";

export class OrderPaginationDto extends PaginationDto {
    @IsOptional()
    shippingCountry?: string;

    @IsOptional()
    shippingState?: string;

    @IsOptional()
    paymentMethod?: string;

    @IsOptional()
    status?: string;

    @IsOptional()
    createdAtStart?: string;

    @IsOptional()
    createdAtEnd?: string;
}