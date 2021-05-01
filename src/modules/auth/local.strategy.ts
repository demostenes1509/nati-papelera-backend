import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../models';
import { Logger } from '../../helpers/logger';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  @Inject()
  private authService: AuthService;

  constructor() {
    super({ usernameField: 'emailAddress' });
  }

  async validate(emailAddress: string, password: string): Promise<User> {
    this.logger.debug(`Authenticating email ${emailAddress}`);
    const user = await this.authService.validateUser(emailAddress, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
