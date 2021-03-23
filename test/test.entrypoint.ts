import * as dotenv from 'dotenv-flow';
dotenv.config();
import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe, before, it } from 'mocha';
import { AppModule } from '../src/app.module';
import { TestModule } from './src/test.module';
import { REGISTRY } from './helpers/decorators';
import { AbstractTestSuite } from './src/abstract-test-suite';

describe('Nati Backend Test Suite', function () {
  let app: INestApplication;

  before(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const applicationTestSuites = Object.keys(REGISTRY);
  for (const applicationTestSuite of applicationTestSuites) {
    const testSuite = REGISTRY[applicationTestSuite];
    const testSuiteTitle = testSuite.title;
    describe(testSuiteTitle, () => {
      const tests = testSuite.tests;
      for (const test of tests) {
        it(test.description, async () => {
          const c: AbstractTestSuite = app.get(testSuite.target);
          c.setApp(app);
          await test.method.apply(c);
        });
      }
    });
  }
});
