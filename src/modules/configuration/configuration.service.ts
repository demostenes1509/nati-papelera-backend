import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger.helper';
import { ConfigurationGetAllDto } from './dto/configuration-get-all-response.dto';
import { Configuration } from '../../models';

@Injectable()
export class ConfigurationService {
  private readonly logger = new Logger(ConfigurationService.name);

  @InjectRepository(Configuration)
  private readonly configurationRepository: Repository<Configuration>;

  async getAll(): Promise<ConfigurationGetAllDto> {
    this.logger.debug('Getting Configuration');
    const configuration = await this.configurationRepository.find({ order: { id: 'ASC' } });
    return new ConfigurationGetAllDto(configuration);
  }


}