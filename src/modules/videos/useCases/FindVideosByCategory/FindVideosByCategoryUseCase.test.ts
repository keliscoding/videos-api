import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';
import { FindVideosByCategoryUseCase } from './FindVideosByCategoryUseCase';

let categoryRepositoryInMemory: ICategoriesRepository;
let videosRepositoryInMemory: VideosRepositoryInMemory;
let findVideosByCategoryUseCase: FindVideosByCategoryUseCase;

describe('Find videos by category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = CategoriesRepositoryInMemory.getInstance();
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
    const result = await videosRepositoryInMemory.findVideosByCategoryId(
      category.id,
      5,
      0,
    );

    expect(result.videos).toHaveLength(3);
    expect(result.count).toBe(3);
  });
});
