import { HttpStatus } from '@nestjs/common';
import { Test, TestSuite } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import * as expect from 'expect';

@TestSuite('Mercado Libre Suite')
export class MercadoLibreTest extends AbstractTestSuite {
  @Test('Mercado Libre Get Categories')
  public async getCategories() {
    await this.httpAdminPost('/mercado-libre/process-categories')
      .attach('file', './test/src/tests/resources/mercado-libre-categories.json.gz')
      .expect(HttpStatus.OK);

    const {
      body: { categories },
    } = await this.httpAdminGet('/mercado-libre/categories').query({ pattern: 'insumos' }).expect(HttpStatus.OK);
    expect(categories.length).toBe(2);
    expect(categories[0].name).toBe('Agro - Insumos Agrícolas');
    expect(categories[1].name).toBe('Agro - Insumos Ganaderos');
  }
}
