import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UploadNewFileResponseDto {
  @ApiProperty()
  @IsNumber()
  insertedRecords: number;

  @ApiProperty()
  @IsNumber()
  updatedRecords: number;

  constructor(insertedRecords: number, updatedRecords: number) {
    this.insertedRecords = insertedRecords;
    this.updatedRecords = updatedRecords;
  }
}
