import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { app } from '@shared/infra/express/app';

describe('Add categories to video controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    const id = uuid();

    await request(app).post('/api/v1/register').send({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });

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

  it('should be able to add a category to a video', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const video = await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'Add Category To Video',
        description: 'Description of a video',
        url: 'https://url.com',
      });

    const category = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'Test' });

    const response = await request(app)
      .post(`/api/v1/videos/${video.body.id}/categories/`)
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        categories: [category.body.id],
      });

    expect(response.status).toBe(200);

    expect(response.body.categories).toHaveLength(2);
  });
});
