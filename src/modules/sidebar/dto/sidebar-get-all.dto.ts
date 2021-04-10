import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Category, Product } from '../../../models';

export class CategoryDto {
  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsArray()
  products: Array<ProductDto>;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.url = category.url;
    this.products = category.products.map((product) => new ProductDto(product));
  }
}

export class ProductDto {
  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  url: string;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.url = product.url;
  }
}

export class SideBarGetAllDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CategoryDto)
  @IsArray()
  categories: Array<CategoryDto>;

  constructor(categories: Array<Category>) {
    this.categories = categories.map((category) => new CategoryDto(category));
  }
}
