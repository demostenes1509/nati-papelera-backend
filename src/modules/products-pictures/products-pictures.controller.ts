import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Response,
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
import { CreatePictureRequestDto } from './dto/create-picture-request.dto';
import { CreatePictureResponseDto } from './dto/create-picture-response.dto';
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
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Query() dto: CreatePictureRequestDto,
    @UploadedFile() file: UploadedFileProps,
  ): Promise<CreatePictureResponseDto> {
    return this.productPictureService.create(dto, file);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async get(@Response() response, @Param('id') id: string): Promise<void> {
    return this.productPictureService.get(response, id);
  }
}
