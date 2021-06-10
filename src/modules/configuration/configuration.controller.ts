import { Controller, Get, Inject, HttpStatus, UseGuards, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '../../enums/role.enum';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfigurationGetAllDto } from './dto/configuration-get-all-response.dto';
import { allColors } from 'winston/lib/winston/config';
import { ConfigurationService } from './configuration.service';

@Controller()
export class ConfigurationController {
  @Inject()
  private configurationService: ConfigurationService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-all')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<ConfigurationGetAllDto> {
    return this.configurationService.getAll();
  }
}
