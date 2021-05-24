import { ArgumentsHost, HttpException, INestApplication } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from './logger';

export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    this.logger.error(JSON.stringify(exception, null, ' '));
    const status = exception.getStatus();

    response.status(status).json(exception.message);
  }
}

export const setupFilters = (app: INestApplication) => {
  app.useGlobalFilters(new AllExceptionsFilter());
};
