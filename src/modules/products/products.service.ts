import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as faker from 'faker';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../../helpers/logger.helper';
import { slugifyLine } from '../../helpers/string.helper';
import { MercadoLibreCategory, Product } from '../../models';
import { MercadoLibreService } from '../mercado-libre/mercado-libre.service';
import { GetProductResponse } from './dto/get-product-response.dto';
import { ProductCreateRequestDto } from './dto/product-create-request.dto';
import { ProductFindOrCreateRequest } from './dto/product-find-by-name-request.dto';
import { ProductUpdateRequest } from './dto/product-update-request.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  @Inject()
  private readonly mercadoLibreService: MercadoLibreService;

  getAll(): Promise<Array<Product>> {
    this.logger.debug('Getting Products');
    return this.productRepository.find({ order: { name: 'ASC' } });
  }

  create(dto: ProductCreateRequestDto, url?: string): Promise<Product> {
    this.logger.debug('Creating Products');
    if (!url) url = slugifyLine(dto.name);
    return this.productRepository.save({ id: uuidv4(), ...dto, url });
  }

  async update(dto: ProductUpdateRequest): Promise<void> {
    this.logger.debug('Updating product');
    await this.productRepository.update(dto.id, { ...dto });
  }

  async findOrCreate(dto: ProductFindOrCreateRequest): Promise<Product> {
    let url = slugifyLine(dto.name);
    let product: Product = await this.productRepository.findOne({
      where: { name: dto.name },
    });
    if (!product) {
      const productWithSameUrl: Product = await this.productRepository.findOne({
        where: { url },
      });

      if (productWithSameUrl) {
        const random = faker.datatype.number({ max: 100 });
        url = `${url}-${random}`;
      }
      product = await this.create(
        {
          name: dto.name,
          description: dto.description,
          categoryId: dto.categoryId,
        },
        url,
      );
    }

    return product;
  }

  async getProduct(categoryUrl: string, productUrl: string): Promise<GetProductResponse> {
    this.logger.debug('Getting Product');
    const product = await this.productRepository
      .createQueryBuilder('pr')
      .innerJoinAndSelect('pr.packaging', 'pck')
      .leftJoinAndSelect('pr.pictures', 'pic')
      .innerJoin('pr.category', 'c')
      .where('pr.url = :productUrl', { productUrl })
      .andWhere('c.url = :categoryUrl', { categoryUrl })
      .addOrderBy('pck.importOrder')
      .getOne();
    if (!product) throw new NotFoundException();

    let mlCategory: Partial<MercadoLibreCategory>;
    if (product.mlCategoryId) {
      mlCategory = await this.mercadoLibreService.getCategoryById({ id: product.mlCategoryId });
    }
    return new GetProductResponse(product, mlCategory);
  }
}
