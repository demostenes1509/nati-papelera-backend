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
    } = await this.httpGet('/mercado-libre/categories').query({ pattern: 'insumos' }).expect(HttpStatus.OK);
    expect(categories.length).toBe(2);
    expect(categories[0].name).toBe('Agro - Insumos Agrícolas');
    expect(categories[1].name).toBe('Agro - Insumos Ganaderos');
  }

  @Test('Mercado Libre Get Categories con Atributos')
  public async getCategoriesAttributes() {
    await this.httpAdminPost('/mercado-libre/process-categories')
      .attach('file', './test/src/tests/resources/mercado-libre-categories-attributes.json.gz')
      .expect(HttpStatus.OK);

    const {
      body: { categories },
    } = await this.httpGet('/mercado-libre/categories').query({ pattern: 'mayonesa' }).expect(HttpStatus.OK);
    expect(categories.length).toBe(1);
    expect(categories[0].name).toBe('Salsas y Aderezos - Mayonesa');
  }
}
