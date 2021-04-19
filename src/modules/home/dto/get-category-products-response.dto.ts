import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Product } from '../../../models';

class ProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  url: string;

  constructor(product: Product) {
    this.name = product.name;
    this.description = product.description;
    this.url = product.url;
  }
}

export class GetCategoryProductsResponse {
  @ApiProperty()
  @IsString()
  categoryName: string;

  @ApiProperty()
  products: Array<ProductDto>;

  constructor(categoryName: string, products: Array<Product>) {
    this.categoryName = categoryName;
    this.products = products.map((p) => new ProductDto(p));
  }
}
