import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Roles } from '../../helpers/decorators';
import { Role } from '../../helpers/enums';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PackagingPublishRequest } from './dto/packaging-publish-request.dto';
import { PackagingPublishResponse } from './dto/packaging-publish-response.dto';
import { PackagingUpdateRequest } from './dto/packaging-update-request.dto';
import { PackagingUpdateResponse } from './dto/packaging-update-response.dto';
import { PackagingService } from './packaging.service';

@Controller()
export class PackagingController {
  @Inject()
  private readonly packagingService: PackagingService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Put('/')
  @Transactional()
  update(@Body() dto: PackagingUpdateRequest): Promise<PackagingUpdateResponse> {
    return this.packagingService.update(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Post('/publish')
  @Transactional()
  publish(@Body() dto: PackagingPublishRequest): Promise<PackagingPublishResponse> {
    return this.packagingService.publish(dto);
  }
}
