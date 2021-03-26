import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenType } from '../../helpers';
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

  async login(user: User): Promise<AccessTokenType> {
    const payload = { emailAddress: user.emailAddress, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
