import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { AppDataSource } from '@src/data-source';
import { app } from '@src/app';

describe('Find All Videos Controller', () => {
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

  it('Should be able to list all existent videos', async () => {
    await request(app).post('/api/v1/videos').send({
      title: 'test_1',
      description: 'description_test',
      url: 'http://firstUrltest.com',
    });

    await request(app).post('/api/v1/videos').send({
      title: 'test_2',
      description: 'description_test',
      url: 'http://secondUrltest.com',
    });

    const response = await request(app).get('/api/v1/videos');

    expect(response.statusCode).toBe(200);
    expect(response.body.videos).toHaveLength(2);
  });

  it('Should be able to list filtered videos', async () => {
    await request(app).post('/api/v1/videos').send({
      title: 'pumpkin cooking video',
      description: 'description_test',
      url: 'http://pumpkin.com',
    });

    await request(app).post('/api/v1/videos').send({
      title: 'grape eating video',
      description: 'description_test',
      url: 'http://grape.com',
    });

    const response = await request(app).get('/api/v1/videos?search=pump');

    expect(response.statusCode).toBe(200);
    expect(response.body.videos).toHaveLength(1);
  });
});
