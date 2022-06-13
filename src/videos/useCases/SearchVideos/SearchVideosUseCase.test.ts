import { VideosRepositoryInMemory } from '../../repositories/in-memory/VideosRepositoryInMemory';
import { SearchVideosUseCase } from './SearchVideosUseCase';

let videosRepositoryInMemory;
let searchVideosUseCase;

describe('Search Videos', () => {
  beforeEach(() => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    searchVideosUseCase = new SearchVideosUseCase(videosRepositoryInMemory);
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

    const allVideos = await searchVideosUseCase.execute();

    expect(allVideos).toHaveLength(2);
  });
});
