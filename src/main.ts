import * as dotenv from 'dotenv-flow';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureTypeORMTransactions, Logger, setupPipes, setupSwagger } from './helpers';
import * as getEnv from 'getenv';

const APP_PORT = getEnv.int('APP_PORT')

const bootstrap = async () => {
  configureTypeORMTransactions(); // Before everything always !
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  setupSwagger(app);
  setupPipes(app);
  app.enableCors();
  await app.listen(APP_PORT);
};
bootstrap();
