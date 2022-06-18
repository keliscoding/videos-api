import request from 'supertest';

import { AppDataSource } from '@src/data-source';
import { app } from '@shared/infra/express/app';

describe('Find Category By Id Controller', () => {
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

  it('should be able to find a category by its id', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const category = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'Games' });

    const categoryFound = await request(app)
      .get(`/api/v1/categories/${category.body.id}`)
      .set('Authorization', 'bearer ' + account.body.token);

    expect(categoryFound.status).toBe(200);
    expect(categoryFound.body).toMatchObject(category.body);
  });
});
