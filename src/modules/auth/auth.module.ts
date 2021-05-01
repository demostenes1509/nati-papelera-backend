import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtParams } from '../../helpers/jwt';
import { SessionModule } from '../session/session.module';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register(jwtParams()), SessionModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, FacebookStrategy],
  exports: [AuthService, JwtModule, SessionModule],
})
export class AuthModule {}
