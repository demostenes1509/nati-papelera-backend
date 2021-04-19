import * as expect from 'expect';
import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { HttpStatus } from '@nestjs/common';

@TestSuite('Home Suite')
export class HomeTest extends AbstractTestSuite {
  @Test('Get Non Existing Category Products')
  public async getNonExistingCategoryProducts() {
    await this.httpGet('/home/get-category-products')
      .query({ categoryUrl: 'non-existent' })
      .expect(HttpStatus.NOT_FOUND);
  }

  @Test('Get Existing Category Products')
  public async getExistingCategoryProducts() {
    const { body } = await this.httpGet('/home/get-category-products')
      .query({ categoryUrl: 'bolsas' })
      .expect(HttpStatus.OK);
    expect(body.categoryName).toBe('Bolsas');
    expect(body.products.length).toBeGreaterThan(0);
  }
}
