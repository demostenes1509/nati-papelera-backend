import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ApiResponse } from '@nestjs/swagger';
import { Category } from '../../models';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CategoryCreateDto } from './dto/category-create.dto';

@Controller()
export class CategoriesController {
  @Inject()
  private readonly categoryService: CategoriesService;

  @UseGuards(JwtAuthGuard)
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
