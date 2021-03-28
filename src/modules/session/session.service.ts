import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as getEnv from 'getenv';
import { User } from '../../models';

const SESSION_TIMEOUT = getEnv.int('SESSION_TIMEOUT');

@Injectable()
export class SessionService {
  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  public async createSession(access_token: string, user: User) {
    console.log(SESSION_TIMEOUT);
    console.log(typeof SESSION_TIMEOUT);

    await this.cacheManager.set(access_token, user, { ttl: SESSION_TIMEOUT });
  }

  public async getSessionInfo(authorization: string): Promise<User> {
    return await this.cacheManager.get(authorization.replace('Bearer ', ''));
  }
}
