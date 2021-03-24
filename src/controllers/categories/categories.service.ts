import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../models';
import { Repository, Transaction } from 'typeorm';

@Injectable()
export class CategoriesService {
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  @Transaction()
  getAll(): Promise<Array<Category>> {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }
}
