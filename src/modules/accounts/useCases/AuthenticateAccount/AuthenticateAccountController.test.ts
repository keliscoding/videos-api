import request from 'supertest';
import { app } from '@src/app';
import { AppDataSource } from '@src/data-source';

describe('authenticate account controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to authenticate an account', async () => {
    await request(app).post('/api/v1/register').send({
      username: 'test_user',
      email: 'test@email.com',
      password: 'testpassword',
    });

    const response = await request(app)
      .post('/api/v1/login')
      .send({ username: 'test_user', password: 'testpassword' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
