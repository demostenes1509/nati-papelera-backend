import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../models';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from './dto/category-create.dto';

@Injectable()
export class CategoriesService {
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  getAll(): Promise<Array<Category>> {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  create(dto: CategoryCreateDto): Promise<Category> {
    return this.categoryRepository.save({ id: uuidv4(), ...dto });
  }
}
