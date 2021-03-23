import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe, before } from 'mocha';
import { AppModule } from '../src/app.module';
import { TestModule } from './src/test.module';
import { registerTests } from './helpers/register-tests';

describe('Nati Backend Test Suite', () => {
  let app: INestApplication;

  before(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  registerTests(app);
});
