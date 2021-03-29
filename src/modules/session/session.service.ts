import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as getEnv from 'getenv';

const SESSION_TIMEOUT = getEnv.int('SESSION_TIMEOUT');

@Injectable()
export class SessionService {
  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  public async createSession(access_token: string, ttl: number = SESSION_TIMEOUT) {
    await this.cacheManager.set(access_token, 1, { ttl });
  }

  public async isSessionExpired(authorization: string): Promise<boolean> {
    const session = await this.cacheManager.get(authorization.replace('Bearer ', ''));
    return session === null;
  }
}
