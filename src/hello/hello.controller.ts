import { Controller, Get, Inject } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller()
export class HelloController {
  @Inject()
  private readonly helloService: HelloService;

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }
}
