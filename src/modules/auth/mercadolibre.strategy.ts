import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-mercadolibre';
import { UserTokenInfo } from '../../interfaces/request.interface';
import { Logger } from '../../helpers/logger.helper';
import { mercadoLibreParams, Profile } from '../../helpers/mercadolibre.helper';
import { AuthService } from './auth.service';
import { Role } from '../../enums/role.enum';
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
    done: (err: string, user?: UserTokenInfo) => void,
  ): Promise<void> {
    this.logger.log(`Access Token: ${accessToken} refreshToken: ${refreshToken}`);
    this.logger.log(`Email ${profile.email} has logged in`);
    const user = await this.authService.getUser(profile.email, 'mercadolibre');
    if (!user) {
      throw new UnauthorizedException();
    }
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
