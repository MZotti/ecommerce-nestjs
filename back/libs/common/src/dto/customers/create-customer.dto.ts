import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty({ message: 'Name required' })
    @IsString()
    name!: string;

    @IsNotEmpty({ message: 'Email required' })
    @IsEmail({}, { message: 'Invalid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Document required' })
    document!: string

    @IsNotEmpty({ message: 'Phone required' })
    phone!: string

    @IsOptional()
    @IsDate()
    birthdate?: string
}