import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterCustomerDto {
    @IsNotEmpty({ message: 'Name required' })
    @IsString()
    name!: string;

    @IsNotEmpty({ message: 'Email required' })
    @IsEmail({}, { message: 'Invalid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Document required' })
    document!: string

    @IsOptional()
    @IsNotEmpty({ message: 'Phone required' })
    phone?: string

    @IsNotEmpty({ message: 'Password required' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password!: string;
}