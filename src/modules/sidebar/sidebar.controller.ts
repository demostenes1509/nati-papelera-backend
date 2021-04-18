import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SideBarGetAllDto } from './dto/sidebar-get-all.dto';
import { SideBarService } from './sidebar.service';

@Controller()
export class SideBarController {
  @Inject()
  private readonly sidebarService: SideBarService;

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-all')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<SideBarGetAllDto> {
    return this.sidebarService.getAll();
  }
}
