import { Controller, Get, HttpCode, HttpStatus, Inject, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetCategoryProductsRequest } from './dto/get-category-products-request.dto';
import { GetCategoryProductsResponse } from './dto/get-category-products-response.dto';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  @Inject()
  private readonly homeService: HomeService;

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-category-products')
  @HttpCode(HttpStatus.OK)
  async getCategory(@Query() dto: GetCategoryProductsRequest): Promise<GetCategoryProductsResponse> {
    return this.homeService.getCategoryProducts(dto);
  }
}
