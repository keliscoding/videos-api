import request from 'supertest';

import { AppDataSource } from '@src/data-source';
import { app } from '@src/app';

describe('Find All Videos Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('Should be able to list all existent videos', async () => {
    await request(app).post('/api/videos').send({
      title: 'test_1',
      description: 'description_test',
      url: 'http://firstUrltest.com',
    });

    await request(app).post('/api/videos').send({
      title: 'test_2',
      description: 'description_test',
      url: 'http://secondUrltest.com',
    });

    const response = await request(app).get('/api/videos');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
