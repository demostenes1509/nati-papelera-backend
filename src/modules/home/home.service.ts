import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { Category } from '../../models';
import { GetCategoryProductsResponse } from './dto/get-category-products-response.dto';

@Injectable()
export class HomeService {
  private readonly logger = new Logger(HomeService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async getCategoryProducts(categoryUrl: string): Promise<GetCategoryProductsResponse> {
    this.logger.debug('Getting Products from Category');

    const category = await this.categoryRepository
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.products', 'pr')
      .innerJoinAndSelect('pr.packaging', 'pck')
      .leftJoinAndSelect('pr.pictures', 'pic')
      .where('c.url = :categoryUrl', { categoryUrl })
      .orderBy('pr.name')
      .addOrderBy('pck.importOrder')
      .getOne();
    if (!category) throw new NotFoundException();

    return new GetCategoryProductsResponse(category);
  }
}
