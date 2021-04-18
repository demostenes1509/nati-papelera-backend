import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';
import { SideBarGetAllDto } from './dto/sidebar-get-all.dto';

@Injectable()
export class SideBarService {
  private readonly logger = new Logger(SideBarService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async getAll(): Promise<SideBarGetAllDto> {
    this.logger.debug('Getting sidebar info');
    const categories = await this.categoryRepository.find({ relations: ['products'], order: { name: 'ASC' } });
    return new SideBarGetAllDto(categories);
  }
}
