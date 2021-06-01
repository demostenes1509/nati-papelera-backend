import * as dotenv from 'dotenv-flow';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as getEnv from 'getenv';
import { Logger } from './helpers/logger.helper';
import { configureTypeORMTransactions } from './helpers/transactions.helper';
import { setupSwagger } from './helpers/swagger.helper';
import { setupPipes } from './helpers/pipes.helper';
import { setupFilters } from './helpers/filters.helper';

const APP_PORT = getEnv.int('APP_PORT');

const bootstrap = async () => {
  const logger = new Logger('bootstrap');
  configureTypeORMTransactions(); // Before everything always !
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  setupSwagger(app);
  setupPipes(app);
  setupFilters(app);
  app.enableCors();
  await app.listen(APP_PORT);

  logger.log(`Application is running on: ${await app.getUrl()}`);
};
bootstrap();
