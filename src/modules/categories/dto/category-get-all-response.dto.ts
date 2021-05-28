import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Category } from '../../../models';

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

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.url = category.url;
  }
}

export class CategoriesGetAllDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CategoryDto)
  @IsArray()
  categories: Array<CategoryDto>;

  constructor(providers: Array<Category>) {
    this.categories = providers.map((category) => new CategoryDto(category));
  }
}
