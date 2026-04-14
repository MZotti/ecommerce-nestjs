import { Body, Controller, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from '@app/common/dto/register.dto';
import { LoginDto } from '@app/common/dto/login.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@MessagePattern('register')
	async register(@Payload() registerDto: RegisterDto) {
		return this.authService.register(registerDto);
	}

	@MessagePattern('login')
	async login(@Payload() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@MessagePattern('me')
	async me(@Payload() req: Request) {
		return this.authService.getProfile();
	}
}
