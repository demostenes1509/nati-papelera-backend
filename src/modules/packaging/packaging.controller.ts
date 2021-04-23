import { PackagingService } from './packaging.service';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../../helpers/decorators';
import { Role } from '../../helpers/enums';
import { PackagingUpdateResponse } from './dto/packaging-update-response.dto';
import { PackagingUpdateRequest } from './dto/packaging-update-request.dto';

@Controller()
export class PackagingController {
  @Inject()
  private readonly packagingService: PackagingService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Post('/update')
  @Transactional()
  create(@Body() dto: PackagingUpdateRequest): Promise<PackagingUpdateResponse> {
    return this.packagingService.update(dto);
  }
}
