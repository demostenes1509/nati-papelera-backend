import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Min, Max } from 'class-validator';
import { Configuration } from '../../../models/configuration.entity';

export class ConfigurationRequestDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(200)
    mlCommissionPercentage: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(200)
    mlGainPercentage: number;
}
