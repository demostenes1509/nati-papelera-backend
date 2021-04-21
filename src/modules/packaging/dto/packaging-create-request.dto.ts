import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PackagingCreateRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsString()
  providerId: string;

  @ApiProperty()
  @IsString()
  providerProductId: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
