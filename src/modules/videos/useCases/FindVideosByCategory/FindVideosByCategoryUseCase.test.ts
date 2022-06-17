import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoryRepositoryInMemory';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';
import { FindVideosByCategoryUseCase } from './FindVideosByCategoryUseCase';

let categoryRepositoryInMemory: ICategoryRepository;
let videosRepositoryInMemory: VideosRepositoryInMemory;
let findVideosByCategoryUseCase: FindVideosByCategoryUseCase;

describe('Find videos by category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = CategoryRepositoryInMemory.getInstance();
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    findVideosByCategoryUseCase = new FindVideosByCategoryUseCase(
      videosRepositoryInMemory,
      categoryRepositoryInMemory,
    );
  });
  it('should be able to list all videos that belong to a category', async () => {
    const category = await categoryRepositoryInMemory.create(
      'category for list all videos use case',
    );
    await videosRepositoryInMemory.create({
      title: 'video test1',
      description: 'random description',
      url: 'http://www.video.com/111',
      categories: [category],
    });
    await videosRepositoryInMemory.create({
      title: 'video test2',
      description: 'random description',
      url: 'http://www.video.com/222',
      categories: [category],
    });
    await videosRepositoryInMemory.create({
      title: 'video test1',
      description: 'random description',
      url: 'http://www.video.com/333',
      categories: [category],
    });
    const videos = await videosRepositoryInMemory.findVideosByCategoryId(
      category.id,
    );

    expect(videos).toHaveLength(3);
  });
});
