import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '../../helpers/enums';
import { Roles } from '../../helpers/decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProvidersService } from './providers.service';
import { UploadedFileProps } from '../../helpers/interfaces';
import { UploadNewFileRequestDto } from './dto/upload-new-file-request.dto';
import { ProvidersGetAllDto } from './dto/providers-get-all-response.dto';
import { UploadNewFileResponseDto } from './dto/upload-new-file-response.dto';
import { ProviderUpdateRequestDto } from './dto/provider-update-request.dto';

@Controller()
export class ProvidersController {
  @Inject()
  private readonly providersService: ProvidersService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post('/upload-new-file')
  @Transactional()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadNewFile(
    @Query() dto: UploadNewFileRequestDto,
    @UploadedFile() file: UploadedFileProps,
  ): Promise<UploadNewFileResponseDto> {
    return this.providersService.uploadNewFile(dto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-all')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<ProvidersGetAllDto> {
    console.log('FHB Log Get-All Providers');
    return this.providersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.OK)
  @Put('/provider-update')
  @Transactional()
  @HttpCode(HttpStatus.OK)
  upate(@Body() dto: ProviderUpdateRequestDto): Promise <void> {
    this.providersService.update(dto);
    console.log("Controller provider update");
    return;
  }
}
