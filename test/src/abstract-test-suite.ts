import { INestApplication, Inject, Injectable } from '@nestjs/common';
import * as request from 'supertest';
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
    return request(this.app.getHttpServer()).get(`${path}`);
  }

  public httpPut(path: string) {
    return request(this.app.getHttpServer()).put(`${path}`);
  }

  public httpPost(path: string) {
    return request(this.app.getHttpServer()).post(`${path}`);
  }

  public httpAdminPut(path: string) {
    return this.httpPut(path).set('Authorization', `Bearer ${this.testTokens.adminToken}`);
  }

  public httpAdminGet(path: string) {
    return this.httpGet(path).set('Authorization', `Bearer ${this.testTokens.adminToken}`);
  }

  public httpAdminPost(path: string) {
    return this.httpPost(path).set('Authorization', `Bearer ${this.testTokens.adminToken}`);
  }

  public httpUserPost(path: string) {
    return this.httpPost(path).set('Authorization', `Bearer ${this.testTokens.userToken}`);
  }
}
