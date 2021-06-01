import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../../helpers/logger.helper';
import { slugifyLine } from '../../helpers/string.helper';
import { Category } from '../../models';
import { CategoryCreateRequestDto } from './dto/category-create-request.dto';
import { CategoryUpdateDto } from './dto/category-update-request.dto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async getAll(): Promise<Array<Category>> {
    this.logger.debug('Getting Categories');
    return await this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  async create(dto: CategoryCreateRequestDto): Promise<Category> {
    this.logger.debug('Creating Categories');
    const url = slugifyLine(dto.name);
    return await this.categoryRepository.save({ id: uuidv4(), ...dto, url });
  }

  async update(dto: CategoryUpdateDto): Promise<void> {
    this.logger.debug('Update Categories');
    const { affected } = await this.categoryRepository.update(dto.id, { ...dto });
    if (affected === 0) throw new NotFoundException();
  }

  async findOrCreate(dto: CategoryCreateRequestDto): Promise<Category> {
    let category: Category = await this.categoryRepository.findOne({
      where: { name: dto.name },
    });

    if (!category) {
      category = await this.create(dto);
    }

    return category;
  }
}
