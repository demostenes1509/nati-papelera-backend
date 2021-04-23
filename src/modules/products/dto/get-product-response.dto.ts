import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Packaging, Product } from '../../../models';

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
  url: string;

  @ApiProperty()
  packaging: Array<PackagingDto>;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.url = product.url;
    this.packaging = product.packaging.map((p) => new PackagingDto(p));
  }
}
