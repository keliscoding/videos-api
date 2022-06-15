import request from 'supertest';

import { app } from '@src/app';
import { AppDataSource } from '@src/data-source';

describe('Update Video Controller', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should be able to update a video', async () => {
    const video = await request(app).post('/api/v1/videos').send({
      title: 'test_update',
      description: 'description_test',
      url: 'http://updateUrltest.com',
    });

    const updatedVideo = await request(app)
      .patch(`/api/v1/videos/${video.body.id}`)
      .send({
        title: 'updated_title',
        description: 'new_description',
      });

    expect(updatedVideo.status).toBe(200);
    expect(updatedVideo.body.title).toBe('updated_title');
    expect(updatedVideo.body.description).toBe('new_description');
  });
});
