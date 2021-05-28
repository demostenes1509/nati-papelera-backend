import { HttpStatus } from '@nestjs/common';
import * as expect from 'expect';
import { Test, TestSuite } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
@TestSuite('Categories Suite')
export class CategoriesTest extends AbstractTestSuite {
  @Test('Categories Get All')
  public async getAll() {
    const {
      body: { categories },
    } = await this.httpGet('/categories/get-all').expect(HttpStatus.OK);
    expect(categories.length).toBeGreaterThan(0);
  }
}
