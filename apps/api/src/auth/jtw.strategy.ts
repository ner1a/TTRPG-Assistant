import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';
import { Request } from 'express';

function cookieExtractor(req: Request) {
  return req?.cookies?.acc || null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(cfg: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: fs.readFileSync(
        cfg.get<string>('JWT_PUBLIC_KEY_PATH')!,
        'utf8',
      ),
      algorithms: ['RS256'],
      ignoreExpiration: false,
    });
  }

  validate(payload: { sub: string }) {
    return { id: payload.sub };
  }
}
