import { Transform, Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../pagination.dto";

export class UserPaginationDto extends PaginationDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    roleId?: number;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    isActive?: boolean;

    @IsOptional()
    createdAtStart?: string;

    @IsOptional()
    createdAtEnd?: string;
}