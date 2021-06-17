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
    mlCommissionPercentage: number;

    @ApiProperty()
    @IsNumber()
    mlGainPercentage: number;

    constructor (configuration: Configuration ) {
        this.id = configuration.id;
        this.mlCommissionPercentage = configuration.mlCommissionPercentage;
        this.mlGainPercentage = configuration.mlGainPercentage;
    }

}
