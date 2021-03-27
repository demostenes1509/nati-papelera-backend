import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { HttpStatus } from '@nestjs/common';
import * as expect from 'expect';
import * as faker from 'faker';
@TestSuite('Auth Suite')
export class AuthTest extends AbstractTestSuite {
  @Test('Login Successful')
  public async loginOK() {
    const dto = { emailAddress: 'admin@natipapelera.com', password: 'test' };
    const {
      body: { access_token },
    } = await this.httpPost('/auth/login').send(dto).expect(HttpStatus.OK);
    const {
      body: { emailAddress },
    } = await this.httpGet('/auth/profile').set('Authorization', `Bearer ${access_token}`).expect(HttpStatus.OK);
    expect(emailAddress).toBe(dto.emailAddress);
  }
  @Test('Login Missing field')
  public async loginMissingFields() {
    const dto = { emailAddress: 'test@test.com' };
    await this.httpPost('/auth/login').send(dto).expect(HttpStatus.UNAUTHORIZED);
  }
  @Test('Login Invalid username or password')
  public async invalidUsernameOrPassword() {
    const dto = { emailAddress: 'test@test.com', password: 'test1' };
    await this.httpPost('/auth/login').send(dto).expect(HttpStatus.UNAUTHORIZED);
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

  @Test('Create with Invalid JWT Token')
  public async createInvalidToken() {
    const dto = {
      name: faker.random.words(),
      url: faker.internet.url(),
    };
    return this.httpPost('/categories/create')
      .set('Authorization', `Bearer INVALID`)
      .send(dto)
      .expect(HttpStatus.UNAUTHORIZED);
  }
}
