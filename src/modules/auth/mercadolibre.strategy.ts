import { Strategy } from 'passport-mercadolibre';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../models';
import { Logger } from '../../helpers/logger';
import { mercadoLibreParams, Profile } from '../../helpers/mercadolibre';

@Injectable()
export class MercadoLibreStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MercadoLibreStrategy.name);

  @Inject()
  private authService: AuthService;

  constructor() {
    super(mercadoLibreParams());
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: string, user: User) => void,
  ): Promise<void> {
    this.logger.log(`Access Token: ${accessToken} refreshToken: ${refreshToken}`);
    const { email, first_name: firstName, last_name: lastName } = profile;
    this.logger.log(`Email ${email} has logged in`);
    const user = await this.authService.createOrReplaceUser(email, firstName + ' ' + lastName, 'mercadolibre');
    done(null, user);
  }
}
