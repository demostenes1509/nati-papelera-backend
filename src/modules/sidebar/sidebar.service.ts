import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger.helper';
import { GetAllResponseDto } from './dto/sidebar-get-all-response.dto';
import { GetAllRequestDto } from './dto/sidebar-get-all-request.dto';

@Injectable()
export class SideBarService {
  private readonly logger = new Logger(SideBarService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async getAll(dto: GetAllRequestDto): Promise<GetAllResponseDto> {
    this.logger.debug('Getting sidebar info');
    const categories = await this.categoryRepository
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.products', 'p')
      .orderBy('c.name', 'ASC')
      .addOrderBy('p.name', 'ASC')
      .getMany();

    return new GetAllResponseDto(dto.url, categories);
  }
}
