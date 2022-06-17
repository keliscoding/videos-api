import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { AppDataSource } from '@src/data-source';
import { app } from '@src/app';

describe('Add categories to video controller', () => {
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

  it('should be able to add a category to a video', async () => {
    const video = await request(app).post('/api/v1/videos').send({
      title: 'Add Category To Video',
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

    expect(response.body.categories).toHaveLength(2);
  });
});
