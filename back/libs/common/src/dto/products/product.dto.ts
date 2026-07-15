import { Category } from "@prisma/client";

export class ProductDto {
    id!: number;
    name!: string;
    slug!: string;
    description!: string;
    price!: number;
    stock!: number;
    imageUrl?: string;
    category!: Category;
}