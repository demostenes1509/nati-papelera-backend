import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MercadoLibreGetCategoryRequestDto {
  @ApiProperty()
  @IsString()
  id: string;
}
