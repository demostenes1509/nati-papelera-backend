import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe, before, it } from 'mocha';
// import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestModule } from './src/test.module';
import { REGISTRY } from './helpers/decorators';

describe('AppController (e2e)', () => {
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
          await test.method.apply(app.get(testSuite.target));
        });
      }
    });
  }
});
