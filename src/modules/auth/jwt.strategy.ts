import * as getEnv from 'getenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../models';
import { UserTokenInfo } from '../../helpers/interfaces';
import { Role } from '../../helpers/enums';

const JWT_SECRET_KEY = getEnv('JWT_SECRET_KEY');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(user: User): Promise<UserTokenInfo> {
    return {
      emailAddress: user.emailAddress,
      isAdmin: user.role === Role.Admin,
      role: user.role,
      fullName: user.fullName,
    };
  }
}
