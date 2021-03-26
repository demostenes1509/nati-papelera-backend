import { TestSuite, Test } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { HttpStatus } from '@nestjs/common';
import * as expect from 'expect';
@TestSuite('Auth Suite')
export class AuthTest extends AbstractTestSuite {
  @Test('Login Successful')
  public async loginOK() {
    const dto = { emailAddress: 'test@test.com', password: 'test' };
    const { body } = await this.httpPost('/auth/login').send(dto).expect(HttpStatus.OK);
    expect(body.access_token).toBeDefined();
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
}
