import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { MercadoLibreCategory } from '../../../models';
import { MercadoLibreCategoryDto } from './category.dto';

export class MercadoLibreCategoriesGetAllResponseDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => MercadoLibreCategoryDto)
  @IsArray()
  categories: Array<MercadoLibreCategoryDto>;

  constructor(categories: Array<Partial<MercadoLibreCategory>>) {
    this.categories = categories.map((category) => new MercadoLibreCategoryDto(category));
  }
}
