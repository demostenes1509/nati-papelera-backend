import * as expect from 'expect';
import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { HttpStatus } from '@nestjs/common';

@TestSuite('Product Suite')
export class HomeTest extends AbstractTestSuite {
  @Test('Get Existing Category Products')
  public async getExistingCategoryProducts() {
    const { body } = await this.httpGet('/products/get-category-products/bolsas').expect(HttpStatus.OK);
    expect(body.categoryName).toBe('Bolsas');
    expect(body.products.length).toBeGreaterThan(0);
  }
}
