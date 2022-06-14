import { VideosRepositoryInMemory } from '../../repositories/in-memory/VideosRepositoryInMemory';
import { UpdateVideoUseCase } from './UpdateVideoUseCase';
import { AppError } from '../../../errors/AppError';

let videosRepositoryInMemory;
let updateVideoUseCase;

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
      await updateVideoUseCase.execute('123123123');
    }).rejects.toBeInstanceOf(AppError);
  });
});
