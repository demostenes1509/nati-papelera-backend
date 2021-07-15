import { HttpStatus } from '@nestjs/common';
import { Test, TestSuite } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';

@TestSuite('Products Pictures Suite')
export class ProductsPicturesTest extends AbstractTestSuite {
  @Test('Upload picture file')
  public async uploadPictureFile() {
    const {
      body: { id: productId },
    } = await this.httpGet('/products/get/bolsas/bolsas-papel').expect(HttpStatus.OK);

    await this.httpAdminPost('/products-pictures/')
      .type('form')
      .attach('files', './test/src/tests/resources/product.png', { filename: 'logo' })
      .attach('files', './test/src/tests/resources/product.png', { filename: 'nologo' })
      .field({ productId })
      .expect(HttpStatus.CREATED);
  }
}
