import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { AppDataSource } from '@src/data-source';
import { app } from '@shared/infra/express/app';

describe('Find All Videos Controller', () => {
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

  it('Should be able to list all existent videos', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_1',
        description: 'description_test',
        url: 'http://firstUrltest.com',
      });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'test_2',
        description: 'description_test',
        url: 'http://secondUrltest.com',
      });

    const response = await request(app)
      .get('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token);

    expect(response.statusCode).toBe(200);
    expect(response.body.videos).toHaveLength(2);
  });

  it('Should be able to list filtered videos', async () => {
    const account = await request(app)
      .post('/api/v1/login')
      .send({ username: 'username', password: 'password' });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'pumpkin cooking video',
        description: 'description_test',
        url: 'http://pumpkin.com',
      });

    await request(app)
      .post('/api/v1/videos')
      .set('Authorization', 'bearer ' + account.body.token)
      .send({
        title: 'grape eating video',
        description: 'description_test',
        url: 'http://grape.com',
      });

    const response = await request(app)
      .get('/api/v1/videos?search=pump')
      .set('Authorization', 'bearer ' + account.body.token);

    expect(response.statusCode).toBe(200);
    expect(response.body.videos).toHaveLength(1);
  });
});
