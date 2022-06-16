import request from 'supertest';

import { app } from '@src/app';
import { AppDataSource } from '@src/data-source';

describe('update category controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to update category title', async () => {
    const category = await request(app)
      .post('/api/v1/categories')
      .send({ title: 'Comedy' });

    await request(app)
      .patch(`/api/v1/categories/${category.body.id}`)
      .send({ title: 'Updated Title' });

    const updatedCategory = await request(app).get(
      `/api/v1/categories/${category.body.id}`,
    );

    expect(updatedCategory.body.title).toBe('Updated Title');
    expect(updatedCategory.status).toBe(200);
  });

  it('should not be able to update category with a title already taken', async () => {
    const category = await request(app)
      .post('/api/v1/categories')
      .send({ title: 'Comedy' });

    const updatedCategory = await request(app)
      .patch(`/api/v1/categories/${category.body.id}`)
      .send({ title: 'Updated Title' });

    expect(updatedCategory.status).toBe(400);
  });
});
