import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Role } from '../../helpers/enums';
import { UserTokenInfo } from '../../helpers/interfaces/request.interface';
import { Logger } from '../../helpers/logger';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  @Inject()
  private authService: AuthService;

  constructor() {
    super({ usernameField: 'emailAddress' });
  }

  async validate(
    emailAddress: string,
    password: string,
    done: (err: string, user: UserTokenInfo) => void,
  ): Promise<void> {
    this.logger.debug(`Authenticating email ${emailAddress}`);
    const user = await this.authService.validateUser(emailAddress, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const userTokenInfo: UserTokenInfo = {
      emailAddress: user.emailAddress,
      fullName: user.fullName,
      role: user.role,
      isAdmin: user.role === Role.Admin,
      oauthAccessToken: null,
      oauthRefreshToken: null,
    };
    done(null, userTokenInfo);
  }
}
