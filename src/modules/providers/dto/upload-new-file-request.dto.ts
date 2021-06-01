import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UploadNewFileRequestDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  url: string;
}
