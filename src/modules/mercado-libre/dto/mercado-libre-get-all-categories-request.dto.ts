import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MercadoLibreCategoriesGetAllRequestDto {
  @ApiProperty()
  @IsString()
  pattern: string;
}
