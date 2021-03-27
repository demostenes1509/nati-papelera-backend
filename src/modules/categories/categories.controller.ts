import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, UseGuards, Request } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ApiResponse } from '@nestjs/swagger';
import { Category } from '../../models';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CategoryCreateDto } from './dto/category-create.dto';
import { Roles } from '../../helpers/decorators';
import { Role } from '../../helpers/enums';
import { NatiRequest } from '../../helpers/interfaces';

@Controller()
export class CategoriesController {
  @Inject()
  private readonly categoryService: CategoriesService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  @Transactional()
  create(@Request() { user }: NatiRequest, @Body() dto: CategoryCreateDto): Promise<Category> {
    return this.categoryService.create(dto);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-all')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Array<Category>> {
    return this.categoryService.getAll();
  }
}
