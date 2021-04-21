import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Packaging } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { PackagingFindByProviderRequest } from './dto/packaging-find-by-provider-request.dto';
import { PackagingCreateRequest, PackagingUpdateRequest } from './dto/packaging-create-request.dto';

@Injectable()
export class PackagingService {
  private readonly logger = new Logger(PackagingService.name);

  @InjectRepository(Packaging)
  private readonly packagingRepository: Repository<Packaging>;

  async create(dto: PackagingCreateRequest) {
    return await this.packagingRepository.save({ id: uuidv4(), ...dto });
  }

  async update(dto: PackagingUpdateRequest) {
    return await this.packagingRepository.update(dto.id, { ...dto });
  }

  async findByProvider(dto: PackagingFindByProviderRequest): Promise<Packaging> {
    const packaging: Packaging = await this.packagingRepository.findOne({
      where: { providerId: dto.providerId, providerProductId: dto.providerProductId },
    });

    return packaging;
  }
}
