import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetAllRequestDto {
  @ApiProperty()
  @IsString()
  url: string;
}
