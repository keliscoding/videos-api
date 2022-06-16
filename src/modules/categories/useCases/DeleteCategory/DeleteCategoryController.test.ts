import request from 'supertest';

import { app } from '@src/app';
import { AppDataSource } from '@src/data-source';

describe('delete category controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to delete a category', async () => {
    const category = await request(app)
      .post('/api/v1/categories')
      .send({ title: 'oh no im about to be deleted' });

    const response = await request(app).delete(
      `/api/v1/categories/${category.body.id}`,
    );

    expect(response.status).toBe(204);
  });
});
