import { HttpStatus } from '@nestjs/common';
import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';

@TestSuite('Providers Suite')
export class ProvidersTest extends AbstractTestSuite {
  @Test('Upload and process Mapsa file')
  public async uploadMapsaFile() {
    await this.httpAdminPost('/providers/upload-new-file')
      .query({ provider: 'mapsa' })
      .attach('file', './test/src/tests/mapsa.xls')
      .expect(HttpStatus.CREATED);
  }
}
