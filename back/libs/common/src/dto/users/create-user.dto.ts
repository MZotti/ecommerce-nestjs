import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Role required' })
    @IsNumber()
    roleId!: number;

    @IsNotEmpty({ message: 'Name required' })
    @IsString()
    name!: string;

    @IsNotEmpty({ message: 'Email required' })
    @IsEmail({}, { message: 'Invalid email address' })
    email!: string;
}