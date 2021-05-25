import { ArgumentsHost, HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from './logger';

export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    this.logger.error(JSON.stringify(exception, null, ' '));
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    try {
      message = exception.message;
      status = exception.getStatus();
    } catch (ex) {
      this.logger.error('getStatus() is not implemented');
    }
    response.status(status).json(message);
  }
}

export const setupFilters = (app: INestApplication) => {
  app.useGlobalFilters(new AllExceptionsFilter());
};
