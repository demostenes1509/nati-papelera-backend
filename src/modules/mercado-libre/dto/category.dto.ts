import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { MercadoLibreCategory } from '../../../models';

export class MercadoLibreCategoryDto {
  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  constructor(category: Partial<MercadoLibreCategory>) {
    this.id = category.id;
    this.name = category.name;
  }
}
