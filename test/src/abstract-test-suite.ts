import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export abstract class AbstractTestSuite {
  private app: INestApplication;

  public setApp(app: INestApplication) {
    this.app = app;
  }

  public httpGet() {
    return request(this.app.getHttpServer());
  }
}
