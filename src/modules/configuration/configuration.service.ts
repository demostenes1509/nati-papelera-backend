import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger.helper';
import { ConfigurationDto } from './dto/configuration-get-response.dto';
import { ConfigurationRequestDto } from './dto/configuration-update-request.dto';
import { Configuration } from '../../models';

@Injectable()
export class ConfigurationService {
  private readonly logger = new Logger(ConfigurationService.name);

  @InjectRepository(Configuration)
  private readonly configurationRepository: Repository<Configuration>;

  async get(): Promise<ConfigurationDto> {
    this.logger.debug('Getting ML Configuration Service');
    const configuration = await this.configurationRepository.findOne();
    return new ConfigurationDto(configuration);
  }

  async update(dto: ConfigurationRequestDto): Promise<void> {
    this.logger.debug('Update ML Configuration Service');
    const { affected } = await this.configurationRepository.update(dto.id, { ...dto });
    if (affected === 0) throw new NotFoundException();
  }
}