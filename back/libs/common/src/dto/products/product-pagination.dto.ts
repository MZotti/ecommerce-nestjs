import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../pagination.dto";
import { Type } from "class-transformer";

export class ProductPaginationDto extends PaginationDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    category?: string;

    @IsOptional()
    stock?: "good" | "low" | "empty";

    @IsOptional()
    createdAtStart?: string;

    @IsOptional()
    createdAtEnd?: string;

    @IsOptional()
    @Type(() => Number)
    priceFrom?: number;

    @IsOptional()
    @Type(() => Number)
    priceTo?: number;
}