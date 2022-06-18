import request from 'supertest';

import { app } from '@src/app';
import { AppDataSource } from '@src/data-source';

describe('delete category controller', () => {
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

  it('should be able to delete a category', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const category = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'oh no im about to be deleted' });

    const response = await request(app)
      .delete(`/api/v1/categories/${category.body.id}`)
      .set('Authorization', 'bearer ' + account.body.token);

    expect(response.status).toBe(204);
  });
});
