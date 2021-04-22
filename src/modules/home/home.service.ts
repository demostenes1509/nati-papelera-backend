import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Product } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { GetCategoryProductsResponse } from './dto/get-category-products-response.dto';
import { GetProductResponse } from './dto/get-product-response.dto';

@Injectable()
export class HomeService {
  private readonly logger = new Logger(HomeService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async getCategoryProducts(categoryUrl: string): Promise<GetCategoryProductsResponse> {
    this.logger.debug('Getting Products from Category');
    const category = await this.categoryRepository.findOne(
      { url: categoryUrl },
      { relations: ['products', 'products.packaging'] },
    );
    if (!category) throw new NotFoundException();

    return new GetCategoryProductsResponse(category);
  }

  async getProduct(categoryUrl: string, productUrl: string): Promise<GetProductResponse> {
    this.logger.debug('Getting Product');
    const product = await this.productRepository.findOne(
      {
        url: productUrl,
      },
      { relations: ['packaging'] },
    );
    return new GetProductResponse(product);
  }
}
