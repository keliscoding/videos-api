import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { app } from '@src/app';
import { AppDataSource } from '@src/data-source';

describe('FindVideoById controller', () => {
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

  it('should be able to display a video by its id', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const video = await request(app)
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

    const response = await request(app)
      .get(`/api/v1/videos/${video.body.id}`)
      .set('Authorization', 'bearer ' + account.body.token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(video.body);
  });
});
