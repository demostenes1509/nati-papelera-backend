import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Configuration } from '../../../models/configuration.entity';

export class ConfigurationDto {
  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsNumber()
  mlCommissionPercentage: number;

  @ApiProperty()
  @IsNumber()
  mlGainPercentage: number;

  constructor(configuration: Configuration) {
    this.id = configuration.id;
    this.mlCommissionPercentage = configuration.mlCommissionPercentage;
    this.mlGainPercentage = configuration.mlGainPercentage;
  }
}

export class GetConfigurationResponseDto {
  @ApiProperty()
  configuration: ConfigurationDto;

  constructor(configuration: Configuration) {
    this.configuration = new ConfigurationDto(configuration);
  }
}

export class GetConfigurationResponseDto {
    @ApiProperty()
    configuration: ConfigurationDto

    constructor (configuration: Configuration) {
        this.configuration = new ConfigurationDto(configuration);
    }
}
