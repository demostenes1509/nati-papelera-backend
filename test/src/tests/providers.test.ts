import { HttpStatus } from '@nestjs/common';
import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';

@TestSuite('Providers Suite')
export class ProvidersTest extends AbstractTestSuite {
  @Test('Upload and process Manapel file')
  public async uploadManapelFile() {
    await this.httpAdminPost('/providers/upload-new-file')
      .query({ provider: 'manapel' })
      .attach('file', './test/src/tests/manapel.xls')
      .expect(HttpStatus.CREATED);
  }
}
