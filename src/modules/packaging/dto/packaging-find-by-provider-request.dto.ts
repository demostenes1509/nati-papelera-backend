import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PackagingFindByProviderRequest {
  @ApiProperty()
  @IsString()
  providerId: string;

  @ApiProperty()
  @IsString()
  providerProductId: string;
}
