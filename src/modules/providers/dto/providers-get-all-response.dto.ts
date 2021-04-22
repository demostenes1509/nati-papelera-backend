import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Provider } from '../../../models';

export class ProviderDto {
  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  url: string;

  constructor(provider: Provider) {
    this.id = provider.id;
    this.name = provider.name;
    this.url = provider.url;
  }
}

export class ProvidersGetAllDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => ProviderDto)
  @IsArray()
  providers: Array<ProviderDto>;

  constructor(providers: Array<Provider>) {
    this.providers = providers.map((provider) => new ProviderDto(provider));
  }
}
