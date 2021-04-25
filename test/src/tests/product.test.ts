import * as expect from 'expect';
import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { HttpStatus } from '@nestjs/common';

@TestSuite('Product Suite')
export class ProductTest extends AbstractTestSuite {
  @Test('Get Existing Category Products')
  public async getExistingCategoryProducts() {
    const { body } = await this.httpGet('/home/get-category-products/bolsas').expect(HttpStatus.OK);
    expect(body.categoryName).toBe('Bolsas');
    expect(body.products.length).toBeGreaterThan(0);
  }

  @Test('Upload picture file')
  public async uploadPictureFile() {
    const {
      body: { id: productId },
    } = await this.httpGet('/products/get/bolsas/bolsas-papel').expect(HttpStatus.OK);

    await this.httpAdminPost('/products/add-picture')
      .query({ productId })
      .attach('file', './test/src/tests/resources/product.png')
      .expect(HttpStatus.CREATED);
  }
}
