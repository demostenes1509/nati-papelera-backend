import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../models';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from './dto/category-create-request.dto';
import { Logger } from '../../helpers/logger';
import { slugifyLine } from '../../helpers/string';
import { CategoriesGetAllDto } from './dto/category-get-all-response.dto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async getAll(): Promise<CategoriesGetAllDto> {
    this.logger.debug('Getting Categories');
    const categories = await this.categoryRepository.find({ order: { name: 'ASC' } });
    return new CategoriesGetAllDto(categories);
  }

  create(dto: CategoryCreateDto): Promise<Category> {
    this.logger.debug('Creating Categories');
    const url = slugifyLine(dto.name);
    return this.categoryRepository.save({ id: uuidv4(), ...dto, url });
  }

  async findOrCreate(dto: CategoryCreateDto): Promise<Category> {
    let category: Category = await this.categoryRepository.findOne({
      where: { name: dto.name },
    });

    if (!category) {
      category = await this.categoryRepository.save({
        id: uuidv4(),
        name: dto.name,
        url: slugifyLine(dto.name),
      });
    }

    return category;
  }
}
