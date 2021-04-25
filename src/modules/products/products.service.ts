import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as faker from 'faker';
import { UploadedFileProps } from '../../helpers/interfaces';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { slugifyLine } from '../../helpers/string';
import { Logger } from '../../helpers/logger';
import { Product, ProductPicture } from '../../models';
import { GetProductResponse } from './dto/get-product-response.dto';
import { ProductCreateRequestDto } from './dto/product-create-request.dto';
import { ProductFindOrCreateRequest } from './dto/product-find-by-name-request.dto';
import { ProductUpdateRequest } from './dto/product-update-request.dto';
import { ProductUpdateResponse } from './dto/product-update-response.dto';
import { AddNewImageRequestDto } from './dto/add-new-image-request.dto';
import { uploadProductPicture } from '../../helpers/aws';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  @InjectRepository(ProductPicture)
  private readonly productPictureRepository: Repository<ProductPicture>;

  getAll(): Promise<Array<Product>> {
    this.logger.debug('Getting Products');
    return this.productRepository.find({ order: { name: 'ASC' } });
  }

  create(dto: ProductCreateRequestDto, url?: string): Promise<Product> {
    this.logger.debug('Creating Products');
    if (!url) url = slugifyLine(dto.name);
    return this.productRepository.save({ id: uuidv4(), ...dto, url });
  }

  async update(dto: ProductUpdateRequest): Promise<ProductUpdateResponse> {
    this.logger.debug('Updating product');
    await this.productRepository.update(dto.id, { ...dto });
    const packaging = await this.productRepository.findOneOrFail(dto.id);
    return new ProductUpdateResponse(packaging);
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
      .innerJoin('pr.category', 'c')
      .where('pr.url = :productUrl', { productUrl })
      .andWhere('c.url = :categoryUrl', { categoryUrl })
      .addOrderBy('pck.importOrder')
      .getOne();
    if (!product) throw new NotFoundException();

    return new GetProductResponse(product);
  }

  async addPicture(dto: AddNewImageRequestDto, file: UploadedFileProps): Promise<void> {
    this.logger.debug('Adding picture to product ' + dto.productId);
    const product = await this.productRepository.findOne({ id: dto.productId });
    if (!product) throw new NotFoundException();

    const key = await uploadProductPicture(file);
    await this.productPictureRepository.save({ id: key, productId: product.id, contentType: 'Hola' });
  }
}
