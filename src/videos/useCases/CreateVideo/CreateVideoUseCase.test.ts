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
    const newVideo = await createVideoUseCase.execute({
      title: 'Video Test',
      description: 'This is a description',
      url: 'https://urltest.com',
    });

    expect(newVideo).toHaveProperty('id');
  });

  it('should not be able to create a new video without all fields filled', async () => {
    expect(async () => {
      await createVideoUseCase.execute({
        title: undefined,
        description: 'This is a description',
        url: 'https://urltest.com',
      });
    }).rejects.toBeInstanceOf(Error);

    expect(async () => {
      await createVideoUseCase.execute({
        title: 'Video Test',
        description: undefined,
        url: 'https://urltest.com',
      });
    }).rejects.toBeInstanceOf(Error);

    expect(async () => {
      await createVideoUseCase.execute({
        title: 'Video Test',
        description: 'This is a description',
        url: undefined,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
