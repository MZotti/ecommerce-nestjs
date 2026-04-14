import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '@app/common/dto/register.dto';
import { LoginDto } from '@app/common/dto/login.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(registerDto: RegisterDto) {
        const { name, email, password } = registerDto;

        const existingUser = await this.prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw new RpcException({
                statusCode: 409,
                message: 'Email already in use',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: { id: true, email: true, createdAt: true },
        });
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new RpcException({
                statusCode: 401,
                message: 'Invalid credentials',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new RpcException({
                statusCode: 401,
                message: 'Invalid credentials',
            });
        }

        return {
            access_token: this.jwtService.sign(user),
        };
    }

    async getProfile() {
        return;
    }
}
