import { AppError } from '../../../errors/AppError';
import { VideosRepositoryInMemory } from '../../repositories/in-memory/VideosRepositoryInMemory';
import { FindVideoByIdUseCase } from './FindVideoByIdUseCase';

let videoRepositoryInMemory;
let findVideoByIdUseCase;

describe('Find video by id', () => {
  beforeEach(() => {
    videoRepositoryInMemory = new VideosRepositoryInMemory();
    findVideoByIdUseCase = new FindVideoByIdUseCase(videoRepositoryInMemory);
  });

  it('should be able to retrieve video by its id', async () => {
    const newVideo = await videoRepositoryInMemory.create({
      title: 'Video Test',
      description: 'This is a description',
      url: 'https://urltest.com',
    });

    const videoFound = await findVideoByIdUseCase.execute(newVideo.id);

    expect(videoFound).toMatchObject(newVideo);
  });

  it('should throw an error if id is non-existent', async () => {
    expect(async () => {
      await findVideoByIdUseCase.execute('123123123');
    }).rejects.toBeInstanceOf(AppError);
  });
});
