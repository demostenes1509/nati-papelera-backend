import { Controller, Inject } from '@nestjs/common';
import { PackagingService } from './packaging.service';

@Controller()
export class PackagingController {
  @Inject()
  private readonly packagingService: PackagingService;
}
