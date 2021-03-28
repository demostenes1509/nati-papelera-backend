import { CacheModuleOptions } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import * as getEnv from 'getenv';

const REDIS_SERVER = getEnv('REDIS_SERVER');
const REDIS_PORT = getEnv.int('REDIS_PORT');
const SESSION_TIMEOUT = getEnv.int('SESSION_TIMEOUT');

export const cacheParams = (): CacheModuleOptions => {
  return {
    store: redisStore,
    host: REDIS_SERVER,
    port: REDIS_PORT,
    ttl: SESSION_TIMEOUT,
  };
};
