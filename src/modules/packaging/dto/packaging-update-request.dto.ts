import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class PackagingUpdateRequest {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
