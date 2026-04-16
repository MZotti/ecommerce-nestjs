import { Body, Controller, Get, HttpException, Inject, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        try {
            return await lastValueFrom(
                this.client.send('register', registerDto),
            );
        } catch (error: any) {
            if (error?.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            }

            throw new HttpException(
                'Internal server error',
                500,
            );
        }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            return await lastValueFrom(
                this.client.send('login', loginDto),
            );
        } catch (error: any) {
            if (error?.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            }

            throw new HttpException(
                'Internal server error',
                500,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Req() req) {
        const user = req.user;
        delete user.password;
        return user;
    }
}