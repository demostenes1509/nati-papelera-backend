import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Category } from '../../../models';
import { CategoryDto } from './category.dto';

export class CategoriesGetAllDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CategoryDto)
  @IsArray()
  categories: Array<CategoryDto>;

  constructor(categories: Array<Category>) {
    this.categories = categories.map((category) => new CategoryDto(category));
  }
}
