import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
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
  mlCategoryId: string;

  @ApiProperty()
  @IsString()
  url: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.url = category.url;
    this.mlCategoryId = category.mlCategoryId;
  }
}
