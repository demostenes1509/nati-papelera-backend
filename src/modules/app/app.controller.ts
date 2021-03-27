import { Controller, Request, Post, UseGuards, HttpCode, HttpStatus, Inject, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Logger } from '../../helpers';
import { NatiRequest } from '../../helpers/interfaces';
import { AccessTokenType } from '../../helpers/types';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';

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
    this.logger.log(`Logged in user: ${user.emailAddress}`);
    return this.authService.login(user);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    this.logger.log(`Getting profile user: ${req.user.emailAddress}`);
    return req.user;
  }
}
