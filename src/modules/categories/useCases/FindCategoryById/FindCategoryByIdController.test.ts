import request from 'supertest';

import { AppDataSource } from '@src/data-source';
import { app } from '@src/app';

describe('Find Category By Id Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to find a category by its id', async () => {
    const category = await request(app)
      .post('/api/v1/categories')
      .send({ title: 'Games' });

    const categoryFound = await request(app).get(
      `/api/v1/categories/${category.body.id}`,
    );

    expect(categoryFound.status).toBe(200);
    expect(categoryFound.body).toMatchObject(category.body);
  });
});
