import { TestSuite, Test } from '../helpers/decorators';
import { TestSuiteSuper } from './testsuite';
// import * as request from 'supertest';

@TestSuite('My Test Suite')
export class Inyec extends TestSuiteSuper {

  @Test('My Test Method')
  public testToRun() {
    console.log('ACACA')
    // return request(app.getHttpServer()).get(`${NATI_BACKEND_PATH}/hello`).expect(200).expect('Hello World!');
  }
}
