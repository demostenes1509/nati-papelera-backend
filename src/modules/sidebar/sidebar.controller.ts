import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Category } from '../../models';
import { SideBarService } from './sidebar.service';

@Controller()
export class SideBarController {
  @Inject()
  private readonly categoryService: SideBarService;

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-all')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Array<Category>> {
    return this.categoryService.getAll();
  }
}
