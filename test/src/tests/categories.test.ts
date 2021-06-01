import { HttpStatus } from '@nestjs/common';
import * as expect from 'expect';
import * as faker from 'faker';
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

  @Test('Categories Update')
  public async update() {
    const dtoCreate = { name: faker.random.words(), mlCategoryId: faker.random.word };
    const {
      body: {
        category: { id },
      },
    } = await this.httpAdminPost('/categories').send(dtoCreate).expect(HttpStatus.CREATED);

    const dtoUpdate = { id, name: faker.random.words(), mlCategoryId: faker.random.word };
    await this.httpAdminPut('/categories').send(dtoUpdate).expect(HttpStatus.NO_CONTENT);
  }
}
