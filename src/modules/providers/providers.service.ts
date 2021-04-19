import * as xslx from 'xlsx';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Provider } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { uploadFile } from '../../helpers';
import { UploadedFileProps } from '../../helpers/interfaces';
import { UploadNewFileRequestDto } from './dto/upload-new-file-request.dto';

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger(ProvidersService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  @InjectRepository(Provider)
  private readonly providerRepository: Repository<Provider>;

  async uploadNewFile(dto: UploadNewFileRequestDto, file: UploadedFileProps): Promise<void> {
    const provider = await this.providerRepository.findOne({ name: dto.provider });
    if (!provider) throw new NotFoundException();

    await uploadFile(file);

    const workbook = xslx.read(file.buffer, { type: 'buffer' });
    const sheetNamesList = workbook.SheetNames;
    if (sheetNamesList.length !== 1) {
      throw new BadRequestException('File is not correctly formatted');
    }
    const excelData = xslx.utils.sheet_to_json(workbook.Sheets[sheetNamesList[0]]);
    console.log(excelData);
  }
}
