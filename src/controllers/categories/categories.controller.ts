import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Category } from '../../models';
import { CategoriesService } from './categories.service';
import { CategoryCreateDto } from './dto/category-create.dto';

@Controller()
export class CategoriesController {
  @Inject()
  private readonly categoryService: CategoriesService;

  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  @Transactional()
  create(@Body() dto: CategoryCreateDto): Promise<Category> {
    return this.categoryService.create(dto);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-all')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Array<Category>> {
    return this.categoryService.getAll();
  }
}
