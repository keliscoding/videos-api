import { VideosRepositoryInMemory } from '@src/videos/repositories/in-memory/VideosRepositoryInMemory';
import { FindAllVideosUseCase } from './FindAllVideosUseCase';

let videosRepositoryInMemory;
let findAllVideosUseCase;

describe('Find All Videos', () => {
  beforeEach(() => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    findAllVideosUseCase = new FindAllVideosUseCase(videosRepositoryInMemory);
  });

  it('Should be able to display all created videos', async () => {
    await videosRepositoryInMemory.create({
      title: 'video test1',
      description: 'random description',
      url: 'http://www.video.com/111',
    });

    await videosRepositoryInMemory.create({
      title: 'video test2',
      description: 'random description',
      url: 'http://www.video.com/222',
    });

    const allVideos = await findAllVideosUseCase.execute();

    expect(allVideos).toHaveLength(2);
  });
});
