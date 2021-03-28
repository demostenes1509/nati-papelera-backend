import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NatiToken } from '../../helpers/interfaces';
import { AccessTokenType } from '../../helpers/types';
import { User } from '../../models';
import { SessionService } from '../session/session.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  @Inject()
  private usersService: UsersService;

  @Inject()
  private jwtService: JwtService;

  @Inject()
  private sessionService: SessionService;

  // @Inject(CACHE_MANAGER)
  // private cacheManager: Cache;

  async validateUser(emailAddress: string, password: string): Promise<User> {
    const user = await this.usersService.get(emailAddress);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(natiToken: NatiToken): Promise<AccessTokenType> {
    const payload = { emailAddress: natiToken.emailAddress, id: natiToken.id };
    const access_token = this.jwtService.sign(payload);
    const user = await this.usersService.get(natiToken.emailAddress);
    // await this.cacheManager.set(access_token, payload);
    await this.sessionService.createSession(access_token, user);

    return {
      access_token,
    };
  }
}
