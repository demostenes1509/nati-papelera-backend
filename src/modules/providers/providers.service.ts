import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { uploadProviderFile } from '../../helpers/aws';
import { UploadedFileProps } from '../../helpers/interfaces';
import { UploadNewFileRequestDto } from './dto/upload-new-file-request.dto';
import { ProviderParser } from './parsers/abstract-provider-parser';
import { AbstractParserProvider } from './parsers/parser-abstract-factory';
import { ProvidersGetAllDto } from './dto/providers-get-all-response.dto';
import { UploadNewFileResponseDto } from './dto/upload-new-file-response.dto';
import { ProviderUpdateRequestDto } from './dto/provider-update-request.dto';
import { ObjectUnsubscribedError } from 'rxjs';
import { Number } from 'aws-sdk/clients/iot';
import { NotContains } from 'class-validator';
import { truncate } from 'fs';

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger(ProvidersService.name);

  @Inject()
  private abstractParserProvider: AbstractParserProvider;

  @InjectRepository(Provider)
  private readonly providerRepository: Repository<Provider>;

  async uploadNewFile(dto: UploadNewFileRequestDto, file: UploadedFileProps): Promise<UploadNewFileResponseDto> {
    this.logger.log('Importing file of provider ');
    const provider = await this.providerRepository.findOne({ id: dto.providerId });
    if (!provider) throw new NotFoundException();

    await uploadProviderFile(file);

    const providerParser: ProviderParser = this.abstractParserProvider.getParser(provider.url);
    const result = await providerParser.parseFile(provider, file);

    this.logger.log('Provider ' + provider.name + ' import finished !');

    return new UploadNewFileResponseDto(result.insertedRecords, result.updatedRecords);
  }

  async getAll(): Promise<ProvidersGetAllDto> {
    this.logger.debug('Getting Providers');
    const providers = await this.providerRepository.find({ order: { name: 'ASC' } });
    return new ProvidersGetAllDto(providers);
  }

  async update(dto: ProviderUpdateRequestDto): Promise <void> {
    const { affected } = await this.providerRepository.update(dto.id, { ...dto});
    console.log(" Provider-update affected rows: " + affected);
    if (affected===0) {
      console.log("Record NOT FOUND");
      throw new NotFoundException(); 
    } else {
      console.log("Probando porcentage");
      if ( dto.percentage < 0 || dto.percentage > 200) {
        console.log("Percentage value out of range");
        throw new BadRequestException();
      }
    }
  }
}
