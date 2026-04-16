import { Body, Controller, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from '@app/common/dto/auth/register.dto';
import { LoginDto } from '@app/common/dto/auth/login.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@MessagePattern('register')
	async register(@Payload() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@MessagePattern('login')
	async login(@Payload() dto: LoginDto) {
		return this.authService.login(dto);
	}
}
