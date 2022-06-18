import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { app } from '@src/app';
import { AppDataSource } from '@src/data-source';

describe('Update Video Controller', () => {
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

  it('should be able to update a video', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const video = await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_update',
        description: 'description_test',
        url: 'http://updateUrltest.com',
      });

    const updatedVideo = await request(app)
      .patch(`/api/v1/videos/${video.body.id}`)
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'updated_title',
        description: 'new_description',
      });

    expect(updatedVideo.status).toBe(200);
    expect(updatedVideo.body.title).toBe('updated_title');
    expect(updatedVideo.body.description).toBe('new_description');
  });
});
