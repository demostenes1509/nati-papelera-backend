import * as dotenv from 'dotenv-flow';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './helpers/swagger';
import { setupPipes } from './helpers/pipes';
import { configureTypeORMTransactions } from './helpers/transactions';
import { Logger } from './helpers/logger';

const bootstrap = async () => {
  configureTypeORMTransactions(); // Before everything always !
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  setupSwagger(app);
  setupPipes(app);
  await app.listen(3000);
};
bootstrap();
