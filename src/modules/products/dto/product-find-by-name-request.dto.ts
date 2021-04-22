import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductFindOrCreateRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  categoryId: string;
}
