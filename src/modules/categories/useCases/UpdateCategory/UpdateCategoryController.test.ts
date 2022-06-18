import request from 'supertest';

import { app } from '@shared/infra/express/app';
import { AppDataSource } from '@src/data-source';

describe('update category controller', () => {
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

  it('should be able to update category title', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const category = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'Comedy' });

    await request(app)
      .patch(`/api/v1/categories/${category.body.id}`)
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'Updated Title' });

    const updatedCategory = await request(app)
      .get(`/api/v1/categories/${category.body.id}`)
      .set('Authorization', 'bearer ' + account.body.token);

    expect(updatedCategory.body.title).toBe('Updated Title');
    expect(updatedCategory.status).toBe(200);
  });

  it('should not be able to update category with a title already taken', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const category = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'Comedy' });

    const updatedCategory = await request(app)
      .patch(`/api/v1/categories/${category.body.id}`)
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'Updated Title' });

    expect(updatedCategory.status).toBe(400);
  });
});
