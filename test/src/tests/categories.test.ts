import * as expect from 'expect';
import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { NATI_BACKEND_PATH } from '../../../src/helpers/constants';

@TestSuite('Categories Suite')
export class CategoriesTest extends AbstractTestSuite {
  @Test('Get All')
  public async getAll() {
    const { body: categories } = await this.httpGet().get(`${NATI_BACKEND_PATH}/categories`).expect(200);
    expect(categories.length).toBeGreaterThan(0);
  }
}
