import { REGISTRY } from './decorators';
import { describe, it } from 'mocha';
import { AbstractTestSuite } from '../src/abstract-test-suite';
import { INestApplication } from '@nestjs/common';

export const registerTests = (app: INestApplication) => {
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
};
