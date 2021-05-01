import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Product, Packaging, Category, ProductPicture } from '../../../models';

class PackagingDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  price: number;

  constructor(packaging: Packaging) {
    this.id = packaging.id;
    this.name = packaging.name;
    this.price = packaging.price;
  }
}

class ProductPictureDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  mimeType: string;

  constructor(picture: ProductPicture) {
    this.id = picture.id;
    this.mimeType = picture.mimeType;
  }
}

class ProductDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  packaging: Array<PackagingDto>;

  @ApiProperty()
  pictures: Array<ProductPictureDto>;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.url = product.url;
    this.packaging = product.packaging.map((p) => new PackagingDto(p));
    this.pictures = product.pictures.map((p) => new ProductPictureDto(p));
  }
}

export class GetCategoryProductsResponse {
  @ApiProperty()
  @IsString()
  categoryName: string;

  @ApiProperty()
  @IsString()
  categoryUrl: string;

  @ApiProperty()
  products: Array<ProductDto>;

  constructor(category: Category) {
    this.categoryName = category.name;
    this.categoryUrl = category.url;
    this.products = category.products.map((p) => new ProductDto(p));
  }
}
