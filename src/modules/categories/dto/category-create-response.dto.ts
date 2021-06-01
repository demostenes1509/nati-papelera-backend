import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Category } from '../../../models';
import { CategoryDto } from './category.dto';

export class CategoryCreateDesponseDto {
  @ApiProperty()
  @ValidateNested()
  category: CategoryDto;

  constructor(category: Category) {
    this.category = new CategoryDto(category);
  }
}
