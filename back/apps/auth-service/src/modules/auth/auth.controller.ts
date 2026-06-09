import { Body, Controller, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { LoginDto } from '@app/common/dto/auth/login.dto';
import { RegisterCustomerDto } from '@app/common/dto/auth/register-customer.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@MessagePattern('register')
	async register(@Payload() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@MessagePattern('registerCustomer')
	async registerCustomer(@Payload() dto: RegisterCustomerDto) {
		console.log("3");
		return this.authService.registerCustomer(dto);
	}

	@MessagePattern('login')
	async login(@Payload() dto: LoginDto) {
		return this.authService.login(dto);
	}

	@MessagePattern('me')
	async me(@Payload() payload: { user: User }) {
		const { user } = payload;
		
		return this.authService.me(user);
	}
}
