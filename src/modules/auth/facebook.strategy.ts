import { Strategy, Profile } from 'passport-facebook-token-nest';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Logger } from '../../helpers/logger';
import { facebookParams } from '../../helpers/facebook';
import { AuthService } from './auth.service';
import { User } from '../../models';

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
    done: (err: string, user: User) => void,
  ): Promise<void> {
    this.logger.debug(`Access Token: ${accessToken} refreshToken: ${refreshToken}`);
    const {
      emails,
      name: { familyName: lastName, givenName: firstName },
    } = profile;
    const email = emails[0].value;
    this.logger.log(`Email ${email} has logged in`);
    const user = await this.authService.createOrReplaceUser(email, firstName + ' ' + lastName, 'facebook');
    done(null, user);
  }
}
