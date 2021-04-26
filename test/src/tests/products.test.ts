import { HttpStatus } from '@nestjs/common';
import * as expect from 'expect';
import { Test, TestSuite } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';

@TestSuite('Products Suite')
export class ProductsTest extends AbstractTestSuite {
  @Test('Get Existing Category Products')
  public async getExistingCategoryProducts() {
    const { body } = await this.httpGet('/home/get-category-products/bolsas').expect(HttpStatus.OK);
    expect(body.categoryName).toBe('Bolsas');
    expect(body.products.length).toBeGreaterThan(0);
  }
}
