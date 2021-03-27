import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NatiToken } from '../../helpers/interfaces';
import { AccessTokenType } from '../../helpers/types';
import { User } from '../../models';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  @Inject()
  private usersService: UsersService;

  @Inject()
  private jwtService: JwtService;

  async validateUser(emailAddress: string, password: string): Promise<User> {
    const user = await this.usersService.get(emailAddress);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: NatiToken): Promise<AccessTokenType> {
    const payload = { emailAddress: user.emailAddress, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
