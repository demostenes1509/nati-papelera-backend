import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';

@TestSuite('Healthchech Suite')
export class HealthcheckTest extends AbstractTestSuite {
  @Test('Test Healthcheck')
  public testHello() {
    return this.httpGet('/healthcheck').expect(200).expect('OK');
  }
}
