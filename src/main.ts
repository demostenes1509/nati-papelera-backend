import * as dotenv from 'dotenv-flow';
dotenv.config();
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './helpers/swagger';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(3000);
};
bootstrap();
