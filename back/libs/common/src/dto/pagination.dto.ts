import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    page = 1;

    @IsOptional()
    @Type(() => Number)
    perPage = 30;
}