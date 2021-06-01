import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CategoryCreateRequestDto } from './dto/category-create-request.dto';
import { CategoryCreateDesponseDto } from './dto/category-create-response.dto';
import { CategoriesGetAllDto } from './dto/category-get-all-response.dto';
import { CategoryUpdateDto } from './dto/category-update-request.dto';

@Controller()
export class CategoriesController {
  @Inject()
  private readonly categoryService: CategoriesService;

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @Transactional()
  async create(@Body() dto: CategoryCreateRequestDto): Promise<CategoryCreateDesponseDto> {
    const category = await this.categoryService.create(dto);
    return new CategoryCreateDesponseDto(category);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('/')
  @Transactional()
  update(@Body() dto: CategoryUpdateDto): Promise<void> {
    return this.categoryService.update(dto);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-all')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<CategoriesGetAllDto> {
    const categories = await this.categoryService.getAll();
    return new CategoriesGetAllDto(categories);
  }
}
