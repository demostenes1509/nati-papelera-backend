import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { uploadFile } from '../../helpers';
import { UploadedFileProps } from '../../helpers/interfaces';
import { UploadNewFileRequestDto } from './dto/upload-new-file-request.dto';
import { ProviderParser } from './parsers/abstract-provider-parser';
import { AbstractParserProvider } from './parsers/parser-abstract-factory';

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger(ProvidersService.name);

  @Inject()
  private abstractParserProvider: AbstractParserProvider;

  @InjectRepository(Provider)
  private readonly providerRepository: Repository<Provider>;

  async uploadNewFile(dto: UploadNewFileRequestDto, file: UploadedFileProps): Promise<void> {
    this.logger.log('Importing file of provider ' + dto.provider);
    const provider = await this.providerRepository.findOne({ name: dto.provider });
    if (!provider) throw new NotFoundException();

    await uploadFile(file);

    const providerParser: ProviderParser = this.abstractParserProvider.getParser(dto.provider);
    await providerParser.parseFile(provider, file);
  }
}
