import { Controller, Request, Post, UseGuards, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AccessTokenType, Logger } from '../../helpers';
import { AuthService } from '../auth/auth.service';
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
  login(@Request() req): Promise<AccessTokenType> {
    this.logger.log(`Logged in user: ${req.user.emailAddress}`);
    return this.authService.login(req.user);
  }
}
