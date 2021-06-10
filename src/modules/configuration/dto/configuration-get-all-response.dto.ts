import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Configuration } from '../../../models/configuration.entity';

export class ConfigurationDto {
    @ApiProperty()
    @IsNumber()
    id: string;

    @ApiProperty()
    @IsNumber()
    ml_commission_percentage: number;

    @ApiProperty()
    @IsNumber()
    ml_gain_percentage: number;

    constructor (configuration: Configuration ) {
        this.id = configuration.id;
        this.ml_commission_percentage = configuration.ml_commission_percentage;
        this.ml_gain_percentage = configuration.ml_gain_percentage;
    }

}

export class ConfigurationGetAllDto {
    @ApiProperty()
    @ValidateNested()
    @Type(() => ConfigurationDto)
    @IsArray()
    configuration: Array<ConfigurationDto>

    constructor(configuration: Array<Configuration>) {
        this.configuration = configuration.map((configuration) => new ConfigurationDto(configuration));
      }   
 }