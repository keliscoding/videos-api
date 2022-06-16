import request from 'supertest';

import { AppDataSource } from '@src/data-source';
import { app } from '@src/app';

describe('Create Category Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    // await AppDataSource.runMigrations();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to create a category', async () => {
    const response = await request(app)
      .post('/api/v1/categories')
      .send({ title: 'comedy' });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a category with title already taken', async () => {
    const response = await request(app)
      .post('/api/v1/categories')
      .send({ title: 'comedy' });

    expect(response.status).toBe(400);
  });
});
