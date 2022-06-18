import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { app } from '@shared/infra/express/app';

describe('remove category from video controller', () => {
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
  it('should be able to remove a category from video', async () => {
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

    const category = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'Test' });

    await request(app)
      .post(`/api/v1/videos/${video.body.id}/categories/`)
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        categories: [category.body.id],
      });

    const response = await request(app)
      .delete(`/api/v1/videos/${video.body.id}/categories/${category.body.id}`)
      .set('Authorization', 'bearer ' + account.body.token);

    const videoWithoutCategory = await request(app)
      .get(`/api/v1/videos/${video.body.id}`)
      .set('Authorization', 'bearer ' + account.body.token);

    expect(response.status).toBe(204);
    expect(videoWithoutCategory.body.categories).toHaveLength(1);
  });
});
