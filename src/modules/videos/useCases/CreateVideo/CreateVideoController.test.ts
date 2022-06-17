import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { AppDataSource } from '@src/data-source';
import { app } from '@src/app';

describe('Create Video Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    // await AppDataSource.runMigrations();

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

  it('Should be able to create a new video', async () => {
    const response = await request(app).post('/api/v1/videos').send({
      title: 'Video Test Title',
      description: 'Description of a video',
      url: 'https://url.com',
    });

    expect(response.status).toBe(201);
  });

  it('should be able to add a default category to a video created without one', async () => {
    const response = await request(app).post('/api/v1/videos').send({
      title: 'Video without a category',
      description: 'Description of a video',
      url: 'https://urlwithoutacategory.com',
    });

    expect(response.status).toBe(201);
    expect(response.body.categories).toMatchObject([{ title: 'free' }]);
  });
});
