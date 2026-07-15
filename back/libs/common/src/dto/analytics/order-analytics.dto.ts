import { IsOptional } from "class-validator";

export class OrderAnalyticsDto {
    @IsOptional()
    createdAtStart?: string;

    @IsOptional()
    createdAtEnd?: string;
}