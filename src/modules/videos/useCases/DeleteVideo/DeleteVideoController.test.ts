import request from 'supertest';

import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { app } from '@shared/infra/express/app';

describe('Delete Video Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();

    await request(app).post('/api/v1/register').send({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to delete a video', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const video = await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'Video Test Title',
        description: 'Description of a video',
        url: 'https://url.com',
      });

    const response = await request(app)
      .delete(`/api/v1/videos/${video.body.id}`)
      .set('Authorization', 'bearer ' + account.body.token);

    expect(response.status).toBe(204);
  });
});
