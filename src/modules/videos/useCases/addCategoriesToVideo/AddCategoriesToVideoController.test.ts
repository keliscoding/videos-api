import request from 'supertest';

import { AppDataSource } from '@src/data-source';
import { app } from '@src/app';

describe('Add categories to video controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });
  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it.only('should be able to add a category to a video', async () => {
    const video = await request(app).post('/api/v1/videos').send({
      title: 'Video Test Title',
      description: 'Description of a video',
      url: 'https://url.com',
    });

    const category = await request(app)
      .post('/api/v1/categories')
      .send({ title: 'Test' });

    const response = await request(app)
      .post(`/api/v1/videos/${video.body.id}/categories/`)
      .send({
        categories: [category.body.id],
      });

    expect(response.status).toBe(200);
  });
});
