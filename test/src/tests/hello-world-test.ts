import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { NATI_BACKEND_PATH } from '../../../src/helpers/constants';

@TestSuite('Hello World Suite')
export class HelloWorldTest extends AbstractTestSuite {
  @Test('Test Hello')
  public testHello() {
    return this.httpGet().get(`${NATI_BACKEND_PATH}/hello`).expect(200).expect('Hello World!');
  }
}
