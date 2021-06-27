import { Controller, Get, Inject, HttpStatus, UseGuards, HttpCode, Body, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '../../enums/role.enum';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetConfigurationResponseDto } from './dto/configuration-get-response.dto';
import { ConfigurationRequestDto } from './dto/configuration-update-request.dto';
import { allColors } from 'winston/lib/winston/config';
import { ConfigurationService } from './configuration.service';
import { Http } from 'winston/lib/winston/transports';

@Controller()
export class ConfigurationController {
  @Inject()
  private configurationService: ConfigurationService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get')
  @HttpCode(HttpStatus.OK)
  get(): Promise<GetConfigurationResponseDto> {
    return this.configurationService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse( {status: HttpStatus.OK})
  @Put('/update')
  @HttpCode(HttpStatus.OK)
  @Transactional()
  async update(@Body() dto: ConfigurationRequestDto): Promise<void> {
    return await this.configurationService.update(dto);
  }
}
