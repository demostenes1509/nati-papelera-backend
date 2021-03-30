import * as dotenv from 'dotenv-flow';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe, before, it } from 'mocha';
import * as getEnv from 'getenv';
import { AppModule } from '../src/app.module';
import { TestModule } from './src/test.module';
import { REGISTRY } from './helpers/decorators';
import { AbstractTestSuite } from './src/abstract-test-suite';
import { setupPipes, Logger, configureTypeORMTransactions } from '../src/helpers';

const TESTTORUN = getEnv('TESTTORUN', null);
const SUITETORUN = getEnv('SUITETORUN', null);

describe('Nati Backend Test Suite', function () {
  let app: INestApplication;
  this.timeout(0);

  before(async () => {
    configureTypeORMTransactions(); // Before everything always !
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(new Logger());
    setupPipes(app);

    await app.init();
  });

  const isSelectedToRun = (actualName, selectedName) => {
    return selectedName === 'null' || selectedName === actualName;
  };

  // Register all decorated tests and uses mocha on 'describe' them
  // We need to register nest.js component, thats why we use app.get
  for (const appTestClass of Object.keys(REGISTRY)) {
    const testSuite = REGISTRY[appTestClass];
    if (isSelectedToRun(testSuite.title, SUITETORUN)) {
      describe(testSuite.title, () => {
        for (const testMethod of testSuite.tests) {
          if (isSelectedToRun(testMethod.description, TESTTORUN)) {
            it(testMethod.description, async () => {
              const c: AbstractTestSuite = app.get(testSuite.target);
              c.setApp(app);
              await testMethod.method.apply(c);
            });
          }
        }
      });
    }
  }
});
