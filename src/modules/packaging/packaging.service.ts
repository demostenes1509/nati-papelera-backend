import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Packaging } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { PackagingFindByProviderRequest } from './dto/packaging-find-by-provider-request.dto';
import { PackagingCreateRequest } from './dto/packaging-create-request.dto';
import { PackagingUpdateResponse } from './dto/packaging-update-response.dto';
import { PackagingUpdateRequest } from './dto/packaging-update-request.dto';

@Injectable()
export class PackagingService {
  private readonly logger = new Logger(PackagingService.name);

  @InjectRepository(Packaging)
  private readonly packagingRepository: Repository<Packaging>;

  async create(dto: PackagingCreateRequest) {
    this.logger.debug('Creating packaging');
    return await this.packagingRepository.save({ id: uuidv4(), ...dto });
  }

  async update(dto: PackagingUpdateRequest): Promise<PackagingUpdateResponse> {
    this.logger.debug('Updating packaging');
    await this.packagingRepository.update(dto.id, { ...dto });
    const packaging = await this.packagingRepository.findOneOrFail(dto.id);
    return new PackagingUpdateResponse(packaging);
  }

  async findByProvider(dto: PackagingFindByProviderRequest): Promise<Packaging> {
    this.logger.debug('Finding packaging');
    const packaging: Packaging = await this.packagingRepository.findOne({
      where: { providerId: dto.providerId, providerProductId: dto.providerProductId },
    });

    return packaging;
  }
}
