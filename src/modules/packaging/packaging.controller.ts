import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { NatiRequest } from '../../interfaces/request.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PackagingPublishRequest } from './dto/packaging-publish-request.dto';
import { PackagingPublishResponse } from './dto/packaging-publish-response.dto';
import { PackagingUpdateRequest } from './dto/packaging-update-request.dto';
import { PackagingService } from './packaging.service';

@Controller()
export class PackagingController {
  @Inject()
  private readonly packagingService: PackagingService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('/')
  @Transactional()
  update(@Body() dto: PackagingUpdateRequest): Promise<void> {
    return this.packagingService.update(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Post('/publish')
  @Transactional()
  publish(@Request() { user }: NatiRequest, @Body() dto: PackagingPublishRequest): Promise<PackagingPublishResponse> {
    return this.packagingService.publish(user, dto);
  }
}
