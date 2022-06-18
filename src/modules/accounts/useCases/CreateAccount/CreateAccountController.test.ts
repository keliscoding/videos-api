import request from 'supertest';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { app } from '@shared/infra/express/app';

describe('create account controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to create a new account', async () => {
    const response = await request(app).post('/api/v1/register').send({
      username: 'random_username',
      email: 'random_email@example.com',
      password: 'random_password',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
