import { Controller, Post, Res, Get, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt.guard';
import { CurrentUser } from './current-user.decorator';
import { toPublicUser } from 'src/users/users.mapper';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const res = await this.authService.register(createUserDto);
    return res;
  }

  @Post('login')
  async login(
    @Body() dto: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken} = await this.authService.login(
      dto.email,
      dto.password,
    );
    res.cookie('acc', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, //PRODUCTION CHANGE (true for https)
      path: '/',
      maxAge: 8 * 60 * 60 * 1000,
    });
    return { ok: true };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('acc', { path: '/' });
    return { ok: true };
  }

  @Get('me') //Control is logged in, token expired
  @UseGuards(JwtAuthGuard) //User protected access
  async me(@CurrentUser() user: { id: string }) {
    const resUser = await this.usersService.findById(user.id);
    return {user: toPublicUser(resUser)};
  }
}
