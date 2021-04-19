import { INestApplication, Inject, Injectable } from '@nestjs/common';
import * as request from 'supertest';
import { NATI_BACKEND_PATH } from '../../src/helpers/constants';
import { TestTokens } from './providers/test-tokens.service';

@Injectable()
export abstract class AbstractTestSuite {
  private app: INestApplication;

  @Inject()
  protected readonly testTokens: TestTokens;

  public setApp(app: INestApplication) {
    this.app = app;
  }

  public httpGet(path: string) {
    return request(this.app.getHttpServer()).get(`${NATI_BACKEND_PATH}${path}`);
  }

  public httpAdminGet(path: string) {
    return this.httpGet(path).set('Authorization', `Bearer ${this.testTokens.adminToken}`);
  }

  public httpPost(path: string) {
    return request(this.app.getHttpServer()).post(`${NATI_BACKEND_PATH}${path}`);
  }

  public httpAdminPost(path: string) {
    return this.httpPost(path).set('Authorization', `Bearer ${this.testTokens.adminToken}`);
  }

  public httpUserPost(path: string) {
    return this.httpPost(path).set('Authorization', `Bearer ${this.testTokens.userToken}`);
  }
}
