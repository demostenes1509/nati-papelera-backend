import { INestApplication } from '@nestjs/common';
import { NATI_BACKEND_PATH } from '../../src/helpers/constants';
import * as request from 'supertest';

export abstract class AbstractTestSuite {
  private app: INestApplication;

  public setApp(app: INestApplication) {
    this.app = app;
  }

  public httpGet(path: string) {
    return request(this.app.getHttpServer()).get(`${NATI_BACKEND_PATH}${path}`);
  }

  public httpPost(path: string) {
    return request(this.app.getHttpServer()).post(`${NATI_BACKEND_PATH}${path}`);
  }
}
