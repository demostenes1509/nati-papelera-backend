import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadNewFileRequestDto {
  @ApiProperty()
  @IsString()
  providerUrl: string;
}
