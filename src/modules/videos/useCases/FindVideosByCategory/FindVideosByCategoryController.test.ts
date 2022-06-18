import { app } from '@src/app';
import request from 'supertest';

import { AppDataSource } from '@src/data-source';

describe('find videos by category', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await request(app).post('/api/v1/register').send({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to list all videos of a category', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const category = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'Games' });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_1',
        description: 'description_test',
        url: 'http://firstUrltest.com',
        categories: [category.body],
      });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_2',
        description: 'description_test',
        url: 'http://secondUrltest.com',
        categories: [category.body],
      });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_3',
        description: 'description_test',
        url: 'http://thirdUrltest.com',
        categories: [category.body],
      });

    const videos = await request(app)
      .get(`/api/v1/categories/${category.body.id}/videos`)
      .set('Authorization', 'bearer ' + account.body.token);

    expect(videos.body.videos).toHaveLength(3);
  });
});
