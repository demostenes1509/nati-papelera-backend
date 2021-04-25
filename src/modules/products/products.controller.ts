import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { UploadedFileProps } from '../../helpers/interfaces';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Roles } from '../../helpers/decorators';
import { Role } from '../../helpers/enums';
import { Product } from '../../models';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetProductResponse } from './dto/get-product-response.dto';
import { ProductCreateRequestDto } from './dto/product-create-request.dto';
import { ProductUpdateRequest } from './dto/product-update-request.dto';
import { ProductUpdateResponse } from './dto/product-update-response.dto';
import { ProductsService } from './products.service';
import { AddNewImageRequestDto } from './dto/add-new-image-request.dto';

@Controller()
export class ProductsController {
  @Inject()
  private readonly productService: ProductsService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  @Transactional()
  create(@Body() dto: ProductCreateRequestDto): Promise<Product> {
    return this.productService.create(dto);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-all')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Array<Product>> {
    return this.productService.getAll();
  }

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get/:categoryUrl/:productUrl')
  @HttpCode(HttpStatus.OK)
  async getProduct(
    @Param('categoryUrl') categoryUrl: string,
    @Param('productUrl') productUrl: string,
  ): Promise<GetProductResponse> {
    return this.productService.getProduct(categoryUrl, productUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Put('/')
  @Transactional()
  update(@Body() dto: ProductUpdateRequest): Promise<ProductUpdateResponse> {
    return this.productService.update(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post('/add-picture')
  @Transactional()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async addPicture(@Query() dto: AddNewImageRequestDto, @UploadedFile() file: UploadedFileProps): Promise<void> {
    return this.productService.addPicture(dto, file);
  }
}
