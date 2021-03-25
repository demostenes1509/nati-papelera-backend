import * as dotenv from 'dotenv-flow';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureTypeORMTransactions, Logger, setupPipes, setupSwagger } from './helpers';

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
