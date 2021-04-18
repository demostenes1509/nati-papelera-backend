import * as expect from 'expect';
import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { HttpStatus } from '@nestjs/common';
@TestSuite('SideBar Suite')
export class SideBarTest extends AbstractTestSuite {
  @Test('Get All')
  public async getAll() {
    const { body: sidebar } = await this.httpGet('/sidebar/get-all').expect(HttpStatus.OK);
    expect(sidebar.categories.length).toBeGreaterThan(0);
    expect(sidebar.categories.filter((c) => c.products.length === 0).length).toBe(0);
  }
}
