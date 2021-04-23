import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Packaging } from '../../../models';

export class PackagingUpdateResponse {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  constructor(packaging: Packaging) {
    this.id = packaging.id;
    this.name = packaging.name;
    this.price = packaging.price;
  }
}
