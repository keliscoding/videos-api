import request from 'supertest';

import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { app } from '@shared/infra/express/app';

describe('Create Category Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    // await AppDataSource.runMigrations();

    await request(app).post('/api/v1/register').send({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to create a category', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const response = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'comedy' });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a category with title already taken', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    const response = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'comedy' });

    expect(response.status).toBe(400);
  });
});
