import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as mocha from 'mocha';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { APPPATH } from '../src/helpers/constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get(`${APPPATH}/hello`).expect(200).expect('Hello World!');
  });
});
