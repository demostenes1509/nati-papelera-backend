import { HttpStatus } from '@nestjs/common';
import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { ManapelParser } from '../../../src/modules/providers/parsers/manapel/manapel-parser';
import * as expect from 'expect';

@TestSuite('Providers Suite')
export class ProvidersTest extends AbstractTestSuite {
  @Test('Upload and process Manapel file')
  public async uploadManapelFile() {
    await this.httpAdminPost('/providers/upload-new-file')
      .query({ provider: 'manapel' })
      .attach('file', './test/src/tests/manapel.xls')
      .expect(HttpStatus.CREATED);
  }

  @Test('Manapel Parser')
  public async parser() {
    const parser = new ManapelParser();

    const res1 = parser.parseProduct('Cristal 10X20/20');
    expect(res1.length).toBe(2);
    expect(res1[0]).toBe('Cristal');
    expect(res1[1]).toBe('10X20/20');

    const res2 = parser.parseProduct('Cristal 45x70/100 P/escombros');
  }
}
