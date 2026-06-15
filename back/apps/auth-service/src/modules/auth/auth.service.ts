import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import { RegisterCustomerDto } from '@app/common/dto/auth/register-customer.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(registerDto: RegisterDto) {
        const { name, email, password, roleId } = registerDto;

        const existingUser = await this.prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw new AppRpcException(409, 'Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                roleId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            },
        });
    }

    async registerCustomer(registerDto: RegisterCustomerDto) {
        const { name, email, document, phone, password } = registerDto;

        const existingUser = await this.prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw new AppRpcException(409, 'Email already in use');
        }

        const existingCustomer = await this.prisma.customer.findFirst({ where: { document } });

        if (existingCustomer) {
            throw new AppRpcException(409, 'Document already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                roleId: 5,
                customer: {
                    create: {
                        document,
                        phone
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                customer: true,
                createdAt: true
            },
        });
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new AppRpcException(401, 'Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppRpcException(401, 'Invalid credentials');
        }

        const loggedUser = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                password: false,
                createdAt: true,
                customer: true,
                addresses: true
            },
        });

        return {
            user: loggedUser,
            access_token: this.jwtService.sign(user),
        };
    }

    async me(user: User) {
        return this.prisma.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                customer: true,
                addresses: true,
            }
        })
    }
}
