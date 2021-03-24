import * as dotenv from 'dotenv-flow';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './helpers/swagger';
import { setupPipes } from './helpers/pipes';
import { configureTypeORMTransactions } from './helpers/transactions';

const bootstrap = async () => {
  configureTypeORMTransactions()  // Before everything always !
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  setupPipes(app);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
};
bootstrap();
