import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';

export class ProviderUpdateRequestDto {
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
  @Min(0)
  @Max(200)
  percentage: number;
}
