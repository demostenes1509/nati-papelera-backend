import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  importOrder: number;
}
