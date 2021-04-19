import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../helpers/enums';
import { TokenInfo, UserTokenInfo } from '../../helpers/interfaces';
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

  async validateUser(emailAddress: string, password: string): Promise<User> {
    const user = await this.usersService.get(emailAddress, 'local');
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: UserTokenInfo): Promise<AccessTokenType> {
    const info: UserTokenInfo = {
      emailAddress: user.emailAddress,
      fullName: user.fullName,
      role: user.role,
      isAdmin: user.role === Role.Admin,
    };
    const access_token = this.jwtService.sign(info);
    await this.sessionService.createSession(access_token);

    return {
      access_token,
    };
  }

  async createOrReplaceUser(emailAddress: string, fullName: string, provider: string): Promise<User> {
    return await this.usersService.getOrCreate(emailAddress, fullName, provider);
  }
}
