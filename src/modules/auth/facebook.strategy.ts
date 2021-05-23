import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook-token-nest';
import { Role } from '../../helpers/enums/role.enum';
import { facebookParams } from '../../helpers/facebook';
import { UserTokenInfo } from '../../helpers/interfaces/request.interface';
import { Logger } from '../../helpers/logger';
import { AuthService } from './auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(FacebookStrategy.name);

  @Inject()
  private authService: AuthService;

  constructor() {
    super(facebookParams());
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: string, user: UserTokenInfo) => void,
  ): Promise<void> {
    this.logger.debug(`Access Token: ${accessToken} refreshToken: ${refreshToken}`);
    const {
      emails,
      name: { familyName: lastName, givenName: firstName },
    } = profile;
    const email = emails[0].value;
    this.logger.log(`Email ${email} has logged in`);
    const user = await this.authService.createOrReplaceUser(email, firstName + ' ' + lastName, 'facebook');
    const userTokenInfo: UserTokenInfo = {
      emailAddress: user.emailAddress,
      fullName: user.fullName,
      role: user.role,
      isAdmin: user.role === Role.Admin,
      oauthAccessToken: accessToken,
      oauthRefreshToken: refreshToken,
    };

    done(null, userTokenInfo);
  }
}
