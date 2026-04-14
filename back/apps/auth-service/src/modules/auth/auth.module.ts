import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		AuthModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'secret',
			signOptions: { expiresIn: '1d' },
		})
	]
})
export class AuthModule { }
