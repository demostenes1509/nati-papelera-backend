import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Packaging } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { PackagingFindByProviderRequest } from './dto/packaging-find-by-provider-request.dto';
import { PackagingCreateRequest } from './dto/packaging-create-request.dto';
import { PackagingUpdateResponse } from './dto/packaging-update-response.dto';
import { PackagingUpdateRequest } from './dto/packaging-update-request.dto';
import { PackagingPublishRequest } from './dto/packaging-publish-request.dto';
import { PackagingPublishResponse } from './dto/packaging-publish-response.dto';
import { UserTokenInfo } from '../../helpers/interfaces/request.interface';
import { meliPost } from '../../helpers/mercadolibre';

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

  async publish(user: UserTokenInfo, dto: PackagingPublishRequest): Promise<PackagingPublishResponse> {
    const packaging = await this.packagingRepository
      .createQueryBuilder('pck')
      .innerJoinAndSelect('pck.product', 'prod')
      .innerJoinAndSelect('prod.category', 'cat')
      .innerJoinAndSelect('pck.provider', 'prov')
      .whereInIds(dto.id)
      .getOne();
    if (!packaging) throw new NotFoundException();

    const title = `${packaging.product.name} ${packaging.name}`;
    const description = `${packaging.product.description}`;
    const price = Math.ceil(packaging.price);

    const body = {
      title: title,
      category_id: 'MLA3530',
      price: price,
      currency_id: 'ARS',
      available_quantity: 10,
      buying_mode: 'buy_it_now',
      condition: 'new',
      listing_type_id: 'gold_special',
      description: {
        plain_text: description,
      },
      video_id: 'YOUTUBE_ID_HERE',
      sale_terms: [
        {
          id: 'WARRANTY_TYPE',
          value_name: 'Garantía del vendedor',
        },
        {
          id: 'WARRANTY_TIME',
          value_name: '1 día',
        },
      ],
      pictures: [
        {
          source: 'http://mla-s2-p.mlstatic.com/968521-MLA20805195516_072016-O.jpg',
        },
      ],
      attributes: [
        {
          id: 'BRAND',
          value_name: 'Marca del producto',
        },
        {
          id: 'EAN',
          value_name: '7898095297749',
        },
      ],
    };

    try {
      const response = await meliPost(user, 'items', body, null);
      console.log(response);
    } catch (exception) {
      throw new InternalServerErrorException(exception);
    }

    return new PackagingPublishResponse();
  }
}
