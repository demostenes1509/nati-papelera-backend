import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { Product } from '../../../models';

export class ProductUpdateResponse {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
  }
}
