import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Provider } from '../../../models';

export class ProviderUpdateResponse {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsNumber()
  percentage: number;

  constructor(provider: Provider) {
    this.id = provider.id;
    this.name = provider.name
    this.url = provider.url
    this.percentage = provider.percentage;
  }
}
