import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { DeleteVideoUseCase } from './DeleteVideoUseCase';

let videosRepositoryInMemory: IVideosRepository;
let deleteVideoUseCase: DeleteVideoUseCase;

describe('Delete Video', () => {
  beforeEach(() => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    deleteVideoUseCase = new DeleteVideoUseCase(videosRepositoryInMemory);
  });

  it('should be able to delete a video', async () => {
    const video = await videosRepositoryInMemory.create({
      title: 'Video about to be deleted',
      description: 'This is a description',
      url: 'https://urltest.com',
    });

    await deleteVideoUseCase.execute(video.id);

    const searchVideo = await videosRepositoryInMemory.findVideoById(video.id);

    expect(searchVideo).toBeUndefined();
  });
});
