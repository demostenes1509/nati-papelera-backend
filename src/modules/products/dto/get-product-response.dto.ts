import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { MercadoLibreCategory, Packaging, Product, ProductPicture } from '../../../models';

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

  @ApiProperty()
  @IsBoolean()
  mlPublished: boolean;

  constructor(packaging: Packaging) {
    this.id = packaging.id;
    this.name = packaging.name;
    this.price = packaging.price;
    this.mlPublished = packaging.mlProductId !== null;
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

export class GetProductResponse {
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
  mlCategoryId: string;

  @ApiProperty()
  @IsString()
  mlCategoryName: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  packaging: Array<PackagingDto>;

  @ApiProperty()
  pictures: Array<ProductPictureDto>;

  constructor(product: Product, mlCategory: Partial<MercadoLibreCategory>) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.url = product.url;
    this.mlCategoryId = product.mlCategoryId;
    this.packaging = product.packaging.map((p) => new PackagingDto(p));
    this.pictures = product.pictures.map((p) => new ProductPictureDto(p));

    if (mlCategory) this.mlCategoryName = mlCategory.name;
  }
}
