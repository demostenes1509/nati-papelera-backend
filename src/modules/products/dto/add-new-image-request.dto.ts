import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddNewImageRequestDto {
  @ApiProperty()
  @IsString()
  productId: string;
}
