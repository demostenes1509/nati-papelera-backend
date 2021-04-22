import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ApiResponse } from '@nestjs/swagger';
import { Product } from '../../models';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { ProductCreateRequestDto } from './dto/product-create-request.dto';
import { Roles } from '../../helpers/decorators';
import { Role } from '../../helpers/enums';

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
}
