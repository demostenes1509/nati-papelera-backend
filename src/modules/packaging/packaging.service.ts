import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../../helpers/logger.helper';
import { UserTokenInfo } from '../../interfaces/request.interface';
import { Packaging } from '../../models';
import { MercadoLibreService } from '../mercado-libre/mercado-libre.service';
import { PackagingCreateRequest } from './dto/packaging-create-request.dto';
import { PackagingFindByProviderRequest } from './dto/packaging-find-by-provider-request.dto';
import { PackagingPublishRequest } from './dto/packaging-publish-request.dto';
import { PackagingPublishResponse } from './dto/packaging-publish-response.dto';
import { PackagingUpdateRequest } from './dto/packaging-update-request.dto';
import { PackagingUpdateResponse } from './dto/packaging-update-response.dto';
@Injectable()
export class PackagingService {
  private readonly logger = new Logger(PackagingService.name);

  @InjectRepository(Packaging)
  private readonly packagingRepository: Repository<Packaging>;

  @Inject()
  private readonly mercadoLibreService: MercadoLibreService;

  async create(dto: PackagingCreateRequest) {
    this.logger.debug('Creating packaging');
    return await this.packagingRepository.save({ id: uuidv4(), ...dto });
  }

  async update(dto: PackagingUpdateRequest): Promise<void> {
    this.logger.debug('Updating packaging');
    const { affected } = await this.packagingRepository.update(dto.id, { ...dto });
    if (affected === 0) throw new NotFoundException();
  }

  async findByProvider(dto: PackagingFindByProviderRequest): Promise<Packaging> {
    this.logger.debug('Finding packaging');
    const packaging: Packaging = await this.packagingRepository.findOne({
      where: { providerId: dto.providerId, providerProductId: dto.providerProductId },
    });

    return packaging;
  }

  async publish(user: UserTokenInfo, dto: PackagingPublishRequest): Promise<PackagingPublishResponse> {
    const packaging = await this.packagingRepository
      .createQueryBuilder('pck')
      .innerJoinAndSelect('pck.product', 'prod')
      .innerJoinAndSelect('prod.category', 'cat')
      .innerJoinAndSelect('pck.provider', 'prov')
      .whereInIds(dto.id)
      .getOne();
    if (!packaging) throw new NotFoundException();

    const product = await this.mercadoLibreService.publishProduct(user, packaging);
    await this.packagingRepository.update(packaging.id, { mlProductId: product.id });

    return new PackagingPublishResponse();
  }
}
