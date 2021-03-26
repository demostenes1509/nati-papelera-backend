import { Controller, Request, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Logger } from '../../helpers';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): void {
    this.logger.log('User logged in:' + req.user.emailAddress);
  }
}
