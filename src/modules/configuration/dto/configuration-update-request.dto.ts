import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Min, Max } from 'class-validator';

export class ConfigurationRequestDto {
    @ApiProperty()
    @IsNumber()
    id: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(200)
    ml_commission_percentage: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(200)
    ml_gain_percentage: number;
}