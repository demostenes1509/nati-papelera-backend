import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { GetCategoryProductsResponse } from './dto/get-category-products-response.dto';

@Injectable()
export class HomeService {
  private readonly logger = new Logger(HomeService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async getCategoryProducts(categoryUrl: string): Promise<GetCategoryProductsResponse> {
    this.logger.debug('Getting Products from Category');

    const category = await this.categoryRepository.findOne(
      { url: categoryUrl },
      { relations: ['products', 'products.packaging'] },
    );
    if (!category) throw new NotFoundException();

    return new GetCategoryProductsResponse(category.name, category.products);
  }
}
