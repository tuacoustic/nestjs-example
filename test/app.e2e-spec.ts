import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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
    return request(app.getHttpServer())
      .get('/')
      .expect(404)
      // .expect('Hello World!');
  });

  it('/test (GET)', async () => {
    const res: request.Response = await request(app.getHttpServer())
      .get('/test')
      .expect(200)
      
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      status: 200,
      data: expect.any(Array),
    });
  });
});
