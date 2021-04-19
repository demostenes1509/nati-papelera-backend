import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetCategoryProductsRequest {
  @ApiProperty()
  @IsString()
  categoryUrl: string;
}
