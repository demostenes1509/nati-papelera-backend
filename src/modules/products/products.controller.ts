import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { Product } from '../../models';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetProductResponse } from './dto/get-product-response.dto';
import { ProductCreateRequestDto } from './dto/product-create-request.dto';
import { ProductUpdateRequest } from './dto/product-update-request.dto';
import { ProductUpdateResponse } from './dto/product-update-response.dto';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  @Inject()
  private readonly productService: ProductsService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
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
}
