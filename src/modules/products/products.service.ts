import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../models';
import { Repository } from 'typeorm';
import { ProductCreateRequestDto } from './dto/product-create-request.dto';
import { Logger } from '../../helpers/logger';
import { ProductFindOrCreateRequest } from './dto/product-find-by-name-request.dto';
import { slugifyLine } from '../../helpers';
import * as faker from 'faker';
import { fake } from 'faker';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  getAll(): Promise<Array<Product>> {
    this.logger.debug('Getting Products');
    return this.productRepository.find({ order: { name: 'ASC' } });
  }

  create(dto: ProductCreateRequestDto): Promise<Product> {
    this.logger.debug('Creating Products');
    return this.productRepository.save({ id: uuidv4(), ...dto });
  }

  async findOrCreate(dto: ProductFindOrCreateRequest): Promise<Product> {
    let url = slugifyLine(dto.name);
    let product: Product = await this.productRepository.findOne({
      where: { name: dto.name },
    });
    if (!product) {
      let productWithSameUrl: Product = await this.productRepository.findOne({
        where: { url },
      });

      if (productWithSameUrl) {
        const random = faker.datatype.number({ max: 100 });
        url = `${url}-${random}`;
      }
      product = await this.productRepository.save({
        id: uuidv4(),
        name: dto.name,
        categoryId: dto.categoryId,
        url,
      });
    }

    return product;
  }
}
