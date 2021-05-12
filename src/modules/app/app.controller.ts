import { Controller, Request, Post, UseGuards, HttpCode, HttpStatus, Inject, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Logger } from '../../helpers/logger';
import { TokenInfo } from '../../helpers/interfaces';
import { AccessTokenType } from '../../helpers/types';
import { AuthService } from '../auth/auth.service';
import { FacebookAuthGuard } from '../auth/facebook-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { InstragramAuthGuard } from '../auth/instagram-auth.guard';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Inject()
  private authService: AuthService;

  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() { user }: TokenInfo): Promise<AccessTokenType> {
    this.logger.debug(`Local log in with user: ${user.emailAddress}`);
    return this.authService.login(user);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    this.logger.debug(`Getting profile user: ${req.user.emailAddress}`);
    return req.user;
  }

  @Post('/facebook')
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Request() { user }: TokenInfo): Promise<AccessTokenType> {
    this.logger.debug(`Facebook log in with user: ${user.emailAddress}`);
    return await this.authService.login(user);
  }

  @Post('/instagram')
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(InstragramAuthGuard)
  async instagramLoginRedirect(@Request() { user }: TokenInfo): Promise<AccessTokenType> {
    this.logger.debug(`Instagram log in with user: ${user.emailAddress}`);
    return await this.authService.login(user);
  }
}
