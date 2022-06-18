import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { AppDataSource } from '@src/data-source';
import { app } from '@src/app';

describe('Create Video Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();

    await request(app).post('/api/v1/register').send({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });

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
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const response = await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'Video Test Title',
        description: 'Description of a video',
        url: 'https://url.com',
      });

    expect(response.status).toBe(201);
  });

  it('should be able to add a default category to a video created without one', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const response = await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'Video without a category',
        description: 'Description of a video',
        url: 'https://urlwithoutacategory.com',
      });

    expect(response.status).toBe(201);
    expect(response.body.categories).toMatchObject([{ title: 'free' }]);
  });
});
