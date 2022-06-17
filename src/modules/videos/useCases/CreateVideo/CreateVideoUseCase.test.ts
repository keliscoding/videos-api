import { AppError } from '@errors/AppError';
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoryRepositoryInMemory';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { CreateVideoUseCase } from './CreateVideoUseCase';

let videosRepositoryInMemory: IVideosRepository;
let categoriesRepositoryInMemory: ICategoryRepository;
let createVideoUseCase: CreateVideoUseCase;

describe('Create Video', () => {
  beforeEach(async () => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    categoriesRepositoryInMemory = CategoryRepositoryInMemory.getInstance();
    createVideoUseCase = new CreateVideoUseCase(
      videosRepositoryInMemory,
      categoriesRepositoryInMemory,
    );

    await categoriesRepositoryInMemory.create('free');
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
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createVideoUseCase.execute({
        title: 'Video Test',
        description: undefined,
        url: 'https://urltest.com',
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createVideoUseCase.execute({
        title: 'Video Test',
        description: 'This is a description',
        url: undefined,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new video with an url already picked', async () => {
    expect(async () => {
      await createVideoUseCase.execute({
        title: 'Video Test',
        description: 'This is a description',
        url: 'https://urltest.com',
      });

      await createVideoUseCase.execute({
        title: 'Video Test',
        description: 'This is a description',
        url: 'https://urltest.com',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a default category to a video created without one', async () => {
    const newVideo = await createVideoUseCase.execute({
      title: 'Video Test',
      description: 'This is a description',
      url: 'https://urltest.com',
    });
    expect(newVideo.categories).toHaveLength(1);
    expect(newVideo.categories).toMatchObject([{ title: 'free' }]);
  });
});
