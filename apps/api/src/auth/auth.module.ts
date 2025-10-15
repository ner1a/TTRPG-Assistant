import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from '../users/userSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';
import { JwtStrategy } from './jtw.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        privateKey: fs.readFileSync(
          cfg.get<string>('JWT_PRIVATE_KEY_PATH')!,
          'utf8',
        ),
        publicKey: fs.readFileSync(
          cfg.get<string>('JWT_PUBLIC_KEY_PATH')!,
          'utf8',
        ),
        signOptions: {
          algorithm: 'RS256',
          expiresIn: cfg.get('JWT_EXPIRATION'),
        },
        verifyOptions: { algorithms: ['RS256'] },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}
