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

<<<<<<< HEAD
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(200)
  mlGainPercentage: number;
=======
    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(200)
    mlGainPercentage: number;
>>>>>>> 188b3cba93a41736458b9bff9d2c326094b89565
}
