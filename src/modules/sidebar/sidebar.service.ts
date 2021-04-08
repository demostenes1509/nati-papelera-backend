import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../models';
import { Repository } from 'typeorm';
import { Logger } from '../../helpers/logger';

@Injectable()
export class SideBarService {
  private readonly logger = new Logger(SideBarService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  getAll(): Promise<Array<Category>> {
    this.logger.debug('Getting sidebar info');
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }
}
