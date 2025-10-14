import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    login(@Body() loginDto: { email: string; password: string }) {
        return this.authService.login(loginDto.email, loginDto.password);
    }
}
