import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../../common/jwt/jwt-auth.guard';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { lastValueFrom } from 'rxjs';
import { RegisterCustomerDto } from '@app/common/dto/auth/register-customer.dto';
import { handleRpcError } from '../../common/utils/handle-rpc-error.util';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
    ) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return lastValueFrom(
            this.client.send('register', registerDto),
        ).catch(handleRpcError);
    }

    @Post('register/customer')
    async registerCustomer(@Body() registerDto: RegisterCustomerDto) {
        return lastValueFrom(
            this.client.send('registerCustomer', registerDto),
        ).catch(handleRpcError);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return lastValueFrom(
            this.client.send('login', loginDto),
        ).catch(handleRpcError);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Req() req) {
        const user = req.user;
        return lastValueFrom(
            this.client.send('me', { user }),
        ).catch(handleRpcError);
    }
}
