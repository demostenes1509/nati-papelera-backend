import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../models';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  @Inject()
  private usersService: UsersService;

  async validateUser(emailAddress: string, password: string): Promise<User> {
    const user = await this.usersService.get(emailAddress);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
