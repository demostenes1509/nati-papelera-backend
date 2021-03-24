import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { NATI_BACKEND_PATH } from '../../../src/helpers/constants';

@TestSuite('Healthchech Suite')
export class HealthcheckTest extends AbstractTestSuite {
  @Test('Test Healthcheck')
  public testHello() {
    return this.httpGet().get(`${NATI_BACKEND_PATH}/healthcheck`).expect(200).expect('OK');
  }
}
