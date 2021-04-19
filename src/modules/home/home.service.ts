import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { GetCategoryProductsRequest } from './dto/get-category-products-request.dto';
import { GetCategoryProductsResponse } from './dto/get-category-products-response.dto';

@Injectable()
export class HomeService {
  private readonly logger = new Logger(HomeService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async getCategoryProducts(dto: GetCategoryProductsRequest): Promise<GetCategoryProductsResponse> {
    this.logger.debug('Getting Products from Category');

    const category = await this.categoryRepository.findOne({ url: dto.categoryUrl }, { relations: ['products'] });
    if (!category) throw new NotFoundException();

    return new GetCategoryProductsResponse(category.name, category.products);
  }
}
