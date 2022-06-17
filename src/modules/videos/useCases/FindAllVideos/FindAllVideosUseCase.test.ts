import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { FindAllVideosUseCase } from './FindAllVideosUseCase';

let videosRepositoryInMemory: IVideosRepository;
let findAllVideosUseCase: FindAllVideosUseCase;

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

  it('Should be able to filter videos by its title', async () => {
    await videosRepositoryInMemory.create({
      title: 'pumpkin test video',
      description: 'random description',
      url: 'http://www.video.com/pumpkin',
    });

    await videosRepositoryInMemory.create({
      title: 'grape test video',
      description: 'random description',
      url: 'http://www.video.com/grape',
    });

    const filteredVideo = await findAllVideosUseCase.execute('pump');

    expect(filteredVideo).toHaveLength(1);
    expect(filteredVideo).toMatchObject([{ title: 'pumpkin test video' }]);
  });
});
