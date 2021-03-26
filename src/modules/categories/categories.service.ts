import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../models';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from './dto/category-create.dto';
import { Logger } from '../../helpers/logger';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  getAll(): Promise<Array<Category>> {
    this.logger.log('Getting Categories');
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  create(dto: CategoryCreateDto): Promise<Category> {
    this.logger.log('Creating Categories');
    return this.categoryRepository.save({ id: uuidv4(), ...dto });
  }
}
