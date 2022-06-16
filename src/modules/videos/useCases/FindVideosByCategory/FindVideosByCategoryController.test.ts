import { app } from '@src/app';
import request from 'supertest';

import { AppDataSource } from '@src/data-source';

describe('find videos by category', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to list all videos of a category', async () => {
    const category = await request(app)
      .post('/api/v1/categories')
      .send({ title: 'Games' });

    await request(app)
      .post('/api/v1/videos')
      .send({
        title: 'test_1',
        description: 'description_test',
        url: 'http://firstUrltest.com',
        categories: [category.body],
      });

    await request(app)
      .post('/api/v1/videos')
      .send({
        title: 'test_2',
        description: 'description_test',
        url: 'http://secondUrltest.com',
        categories: [category.body],
      });

    await request(app)
      .post('/api/v1/videos')
      .send({
        title: 'test_3',
        description: 'description_test',
        url: 'http://thirdUrltest.com',
        categories: [category.body],
      });

    const videos = await request(app).get(
      `/api/v1/categories/${category.body.id}/videos`,
    );

    expect(videos.body).toHaveLength(3);
  });
});
