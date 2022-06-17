import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { AppDataSource } from '@src/data-source';
import { app } from '@src/app';

describe('remove category from video controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();

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
  it('should be able to remove a category from video', async () => {
    const video = await request(app).post('/api/v1/videos').send({
      title: 'Video Test Title',
      description: 'Description of a video',
      url: 'https://url.com',
    });

    const category = await request(app)
      .post('/api/v1/categories')
      .send({ title: 'Test' });

    await request(app)
      .post(`/api/v1/videos/${video.body.id}/categories/`)
      .send({
        categories: [category.body.id],
      });

    const response = await request(app).delete(
      `/api/v1/videos/${video.body.id}/categories/${category.body.id}`,
    );

    const videoWithoutCategory = await request(app).get(
      `/api/v1/videos/${video.body.id}`,
    );

    expect(response.status).toBe(204);
    expect(videoWithoutCategory.body.categories).toHaveLength(1);
  });
});
