import { VideosRepositoryInMemory } from '../../repositories/in-memory/VideosRepositoryInMemory';
import { CreateVideoUseCase } from './CreateVideoUseCase';

let videosRepositoryInMemory;
let createVideoUseCase;

describe('Create Video', () => {
  beforeEach(() => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    createVideoUseCase = new CreateVideoUseCase(videosRepositoryInMemory);
  });

  it('should be able to create a new video', async () => {
    const newVideo = await videosRepositoryInMemory.create({
      title: 'Video Test',
      description: 'This is a description',
      url: 'https://urltest.com',
    });

    expect(newVideo).toHaveProperty('id');
  });
});
