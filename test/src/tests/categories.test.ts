import * as expect from 'expect';
import * as faker from 'faker';
import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { HttpStatus } from '@nestjs/common';
@TestSuite('Categories Suite')
export class CategoriesTest extends AbstractTestSuite {
  @Test('Get All')
  public async getAll() {
    const { body: categories } = await this.httpGet('/categories/get-all').expect(HttpStatus.OK);
    expect(categories.length).toBeGreaterThan(0);
  }

  @Test('Create')
  public async create() {
    const dto = {
      name: faker.random.word(),
      url: faker.internet.url()
    };

    await this.httpPost('/categories/create').send(dto).expect(HttpStatus.CREATED);

    /*
    const { body: categories } = await this.httpGet().get(`${NATI_BACKEND_PATH}/categories/get-all`).expect(200);
    expect(categories.length).toBeGreaterThan(0);
    */
  }
}
