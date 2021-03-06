import { Strategy, Profile } from 'passport-instagram';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Logger } from '../../helpers/logger.helper';
import { instagramParams } from '../../helpers/instagram.helper';
import { AuthService } from './auth.service';
import { User } from '../../models';

@Injectable()
export class InstagramStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(InstagramStrategy.name);

  @Inject()
  private authService: AuthService;

  constructor() {
    super(instagramParams());
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: string, user: User) => void,
  ): Promise<void> {
    this.logger.log(`Access Token: ${accessToken} refreshToken: ${refreshToken}`);
    const {
      emails,
      name: { familyName: lastName, givenName: firstName },
    } = profile;
    const email = emails[0].value;
    this.logger.log(`Email ${email} has logged in`);
    const user = await this.authService.createOrReplaceUser(email, firstName + ' ' + lastName, 'instagram');
    done(null, user);
  }
}
