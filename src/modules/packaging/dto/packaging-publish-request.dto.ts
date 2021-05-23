import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PackagingPublishRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
