import request from 'supertest';

import { AppDataSource } from '@src/data-source';
import { app } from '@shared/infra/express/app';

describe('Find All Categories Controller', () => {
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

  it('should be able to display all existent categories', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'Comedy' });
    await request(app)
      .post('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({ title: 'Games' });

    const categories = await request(app)
      .get('/api/v1/categories')
      .set('Authorization', 'bearer ' + account.body.token);

    expect(categories.body).toHaveLength(2);
  });
});
