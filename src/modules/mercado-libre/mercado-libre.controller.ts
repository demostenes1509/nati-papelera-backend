import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { UploadedFileProps } from '../../interfaces/uploaded-file.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MercadoLibreCategoriesGetAllRequestDto } from './dto/mercado-libre-get-all-categories-request.dto';
import { MercadoLibreCategoriesGetAllResponseDto } from './dto/mercado-libre-get-all-categories-response.dto';
import { MercadoLibreService } from './mercado-libre.service';

@Controller()
export class MercadoLibreController {
  @Inject()
  private readonly mercadoLibreService: MercadoLibreService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Get('/categories')
  async getAll(@Query() dto: MercadoLibreCategoriesGetAllRequestDto): Promise<MercadoLibreCategoriesGetAllResponseDto> {
    const categories = await this.mercadoLibreService.getAllCategories(dto);
    return new MercadoLibreCategoriesGetAllResponseDto(categories);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Post('/process-categories')
  @Transactional()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async processCategories(@UploadedFile() file: UploadedFileProps): Promise<void> {
    console.log('PROCESANDOOOO ');
    return this.mercadoLibreService.processCategories(file);
  }
}
