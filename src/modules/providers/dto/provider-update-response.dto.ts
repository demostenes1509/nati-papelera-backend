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
  @IsNumber()
  percentage: number;

  constructor(provider: Provider) {
    this.id = provider.id;
    this.name = provider.name
    this.percentage = provider.percentage;
  }
}
