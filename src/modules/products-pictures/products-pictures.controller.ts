import {
  Controller,
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
import { Roles } from '../../helpers/decorators';
import { Role } from '../../helpers/enums';
import { UploadedFileProps } from '../../helpers/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddNewImageRequestDto } from './dto/add-new-image-request.dto';
import { ProductsPicturesService } from './products-pictures.service';

@Controller()
export class ProductsPicturesController {
  @Inject()
  private readonly productPictureService: ProductsPicturesService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @Transactional()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async create(@Query() dto: AddNewImageRequestDto, @UploadedFile() file: UploadedFileProps): Promise<void> {
    return this.productPictureService.create(dto, file);
  }
}
