import { HttpStatus } from '@nestjs/common';
import { Test, TestSuite } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';

@TestSuite('Home Suite')
export class HomeTest extends AbstractTestSuite {
  @Test('Get Non Existing Category Products')
  public async getNonExistingCategoryProducts() {
    await this.httpGet('/home/get-category-products/non-existent').expect(HttpStatus.NOT_FOUND);
  }
}
