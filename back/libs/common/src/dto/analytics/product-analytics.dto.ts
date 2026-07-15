import { IsOptional } from "class-validator";

export class ProductAnalyticsDto {
    @IsOptional()
    category?: string;

    @IsOptional()
    createdAtStart?: string;

    @IsOptional()
    createdAtEnd?: string;
}