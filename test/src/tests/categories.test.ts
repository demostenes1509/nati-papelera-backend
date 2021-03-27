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

  @Test('Create with Admin User')
  public async createAdmin() {
    const dto = {
      name: faker.random.words(),
      url: faker.internet.url(),
    };
    await this.httpAdminPost('/categories/create').send(dto).expect(HttpStatus.CREATED);
  }

  @Test('Create with User User')
  public async createUser() {
    const dto = {
      name: faker.random.words(),
      url: faker.internet.url(),
    };
    await this.httpUserPost('/categories/create').send(dto).expect(HttpStatus.FORBIDDEN);
  }

  @Test('Create with Not Logged in User')
  public async createNotLoggedIn() {
    const dto = {
      name: faker.random.words(),
      url: faker.internet.url(),
    };
    await this.httpPost('/categories/create').send(dto).expect(HttpStatus.UNAUTHORIZED);
  }
}
