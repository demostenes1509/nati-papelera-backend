import { Controller, Get, HttpCode, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { NatiRequest } from '../../interfaces/request.interface';
import { Logger } from '../../helpers/logger.helper';
import { AccessTokenType } from '../../types/access-token.type';
import { AuthService } from '../auth/auth.service';
import { FacebookAuthGuard } from '../auth/facebook-auth.guard';
import { InstragramAuthGuard } from '../auth/instagram-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { MercadoLibreAuthGuard } from '../auth/mercadolibre-auth.guard';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Inject()
  private authService: AuthService;

  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() { user }: NatiRequest): Promise<AccessTokenType> {
    this.logger.debug(`Local log in with user: ${user.emailAddress}`);
    return this.authService.login(user);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() { user }: NatiRequest) {
    this.logger.debug(`Getting profile user: ${user.emailAddress}`);
    return user;
  }

  @Post('/facebook')
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Request() { user }: NatiRequest): Promise<AccessTokenType> {
    this.logger.debug(`Facebook log in with user: ${user.emailAddress}`);
    return await this.authService.login(user);
  }

  @Post('/instagram')
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(InstragramAuthGuard)
  async instagramLoginRedirect(@Request() { user }: NatiRequest): Promise<AccessTokenType> {
    this.logger.debug(`Instagram log in with user: ${user.emailAddress}`);
    return await this.authService.login(user);
  }

  @Post('/mercadolibre')
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(MercadoLibreAuthGuard)
  async mercadoLibreRedirect(@Request() { user }: NatiRequest): Promise<AccessTokenType> {
    this.logger.debug(`Mercado Libre log in with user: ${user.emailAddress}`);
    return await this.authService.login(user);
  }
}
