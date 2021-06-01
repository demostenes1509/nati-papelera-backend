import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtParams } from '../../helpers/jwt.helper';
import { SessionModule } from '../session/session.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './facebook.strategy';
import { InstagramStrategy } from './instagram.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { MercadoLibreStrategy } from './mercadolibre.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register(jwtParams()), SessionModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, FacebookStrategy, InstagramStrategy, MercadoLibreStrategy],
  exports: [AuthService, JwtModule, SessionModule],
})
export class AuthModule {}
