import { Controller, Get, HttpCode, HttpStatus, Inject, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllRequestDto } from './dto/sidebar-get-all-request.dto';
import { GetAllResponseDto } from './dto/sidebar-get-all-response.dto';
import { SideBarService } from './sidebar.service';

@Controller()
export class SideBarController {
  @Inject()
  private readonly sidebarService: SideBarService;

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/get-all')
  @HttpCode(HttpStatus.OK)
  getAll(@Query() dto: GetAllRequestDto): Promise<GetAllResponseDto> {
    return this.sidebarService.getAll(dto);
  }
}
