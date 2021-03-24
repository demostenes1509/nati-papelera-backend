import { Controller, Get, Inject } from '@nestjs/common';
import { Category } from '../../models';
import { CategoriesService } from './categories.service';

@Controller()
export class CategoriesController {
  @Inject()
  private readonly categoryService: CategoriesService;

  @Get()
  getHello(): Promise<Array<Category>> {
    return this.categoryService.getAll();
  }
}
