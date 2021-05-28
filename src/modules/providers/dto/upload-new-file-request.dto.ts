import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UploadNewFileRequestDto {
  @ApiProperty()
  @IsUUID()
  providerId: string;
}
