import request from 'supertest';

import { AppDataSource } from '@src/data-source';
import { app } from '@src/app';

describe('Find All Categories Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to display all existent categories', async () => {
    await request(app).post('/api/v1/categories').send({ title: 'Comedy' });
    await request(app).post('/api/v1/categories').send({ title: 'Games' });

    const categories = await request(app).get('/api/v1/categories');

    expect(categories.body).toHaveLength(2);
  });
});
