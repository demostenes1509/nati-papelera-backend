import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from '../../src/modules/session/session.module';
import { jwtParams } from '../../src/helpers/jwt.helper';
import { TestTokens } from './providers/test-tokens.service';
import * as providers from './tests';
import * as configuration from './tests';

@Module({
  imports: [JwtModule.register(jwtParams()), SessionModule],
  controllers: [],
  providers: [...Object.values(providers), TestTokens],
})
export class TestModule {}
