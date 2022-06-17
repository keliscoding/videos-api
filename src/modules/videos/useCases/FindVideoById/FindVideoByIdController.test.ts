import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { app } from '@src/app';
import { AppDataSource } from '@src/data-source';

describe('FindVideoById controller', () => {
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

  it('should be able to display a video by its id', async () => {
    const video = await request(app).post('/api/v1/videos').send({
      title: 'test_1',
      description: 'description_test',
      url: 'http://firstUrltest.com',
    });

    await request(app).post('/api/v1/videos').send({
      title: 'test_2',
      description: 'description_test',
      url: 'http://secondUrltest.com',
    });

    const response = await request(app).get(`/api/v1/videos/${video.body.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(video.body);
  });
});
