import { AppError } from '@shared/errors/AppError';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { UpdateVideoUseCase } from './UpdateVideoUseCase';

let videosRepositoryInMemory: IVideosRepository;
let updateVideoUseCase: UpdateVideoUseCase;

describe('update video', () => {
  beforeEach(() => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    updateVideoUseCase = new UpdateVideoUseCase(videosRepositoryInMemory);
  });

  it('should be able to update a video', async () => {
    const video = await videosRepositoryInMemory.create({
      title: 'Update Video Test',
      description: 'This is a description',
      url: 'https://urltest.com',
    });

    const updatedVideo = await updateVideoUseCase.execute({
      id: video.id,
      title: 'this is a new title',
      description: 'this is a new description',
    });

    const findVideoById = await videosRepositoryInMemory.findVideoById(
      video.id,
    );

    expect(updatedVideo).toMatchObject(findVideoById);
  });

  it('should throw an error if id is non-existent', async () => {
    expect(async () => {
      await updateVideoUseCase.execute({ id: '123123123' });
    }).rejects.toBeInstanceOf(AppError);
  });
});
