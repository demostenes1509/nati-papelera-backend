import { Controller, Get, HttpCode, HttpStatus, Inject, Param, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetCategoryProductsResponse } from './dto/get-category-products-response.dto';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  @Inject()
  private readonly homeService: HomeService;

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-category-products/:categoryUrl')
  @HttpCode(HttpStatus.OK)
  async getCategory(@Param('categoryUrl') categoryUrl: string): Promise<GetCategoryProductsResponse> {
    return this.homeService.getCategoryProducts(categoryUrl);
  }
}
