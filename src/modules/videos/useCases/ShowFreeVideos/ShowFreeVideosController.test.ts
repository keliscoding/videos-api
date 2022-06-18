import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/express/app';
import { AppDataSource } from '@shared/infra/typeorm/data-source';

describe('Show Free Videos Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();

    await request(app).post('/api/v1/register').send({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });

    const id = uuid();

    await AppDataSource.manager.query(
      `
        INSERT INTO categories(id, title, created_at)
        values('${id}', 'free', 'now()') 
    `,
    );
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to display five free videos', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_1',
        description: 'description_test',
        url: 'http://firstUrltest.com',
      });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_2',
        description: 'description_test',
        url: 'http://secondUrltest.com',
      });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_3',
        description: 'description_test',
        url: 'http://thirdUrltest.com',
      });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_4',
        description: 'description_test',
        url: 'http://fourthUrltest.com',
      });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_5',
        description: 'description_test',
        url: 'http://fifthUrltest.com',
      });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_6',
        description: 'description_test',
        url: 'http://sixthUrltest.com',
      });

    const response = await request(app).get('/api/v1/videos/free');

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(5);
  });
});
