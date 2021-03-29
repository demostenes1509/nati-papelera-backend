import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_CONSTANT } from '.';

export const jwtParams = (): JwtModuleOptions => {
  return {
    secret: JWT_CONSTANT.secret,
    signOptions: {},
  };
};
