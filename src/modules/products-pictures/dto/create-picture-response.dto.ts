import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductPicture } from '../../../models';

export class CreatePictureResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  constructor(productPicture: ProductPicture) {
    this.id = productPicture.id;
  }
}
