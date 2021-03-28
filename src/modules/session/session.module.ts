import * as redisStore from 'cache-manager-redis-store';
import * as getEnv from 'getenv';

const REDIS_SERVER = getEnv('REDIS_SERVER');
const REDIS_PORT = getEnv.int('REDIS_PORT');

import { CacheModule, Module } from '@nestjs/common';
import { SessionService } from './session.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: REDIS_SERVER,
      port: REDIS_PORT,
    }),
  ],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
