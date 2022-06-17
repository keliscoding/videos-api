import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoryRepositoryInMemory';
import { VideosRepositoryInMemory } from '@modules/videos/repositories/in-memory/VideosRepositoryInMemory';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { RemoveCategoryFromVideoUseCase } from './RemoveCategoryFromVideoUseCase';

let videosRepositoryInMemory: IVideosRepository;
let categoriesRepositoryInMemory: ICategoryRepository;
let removeCategoriesFromVideosUseCase: RemoveCategoryFromVideoUseCase;

describe('remove category from video', () => {
  beforeEach(() => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    categoriesRepositoryInMemory = CategoryRepositoryInMemory.getInstance();
    removeCategoriesFromVideosUseCase = new RemoveCategoryFromVideoUseCase(
      videosRepositoryInMemory,
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to remove a category from a video', async () => {
    const category = await categoriesRepositoryInMemory.create(
      'category_that_will_remain',
    );
    const category2 = await categoriesRepositoryInMemory.create(
      'category_about_to_be_dumped',
    );
    const video = await videosRepositoryInMemory.create({
      title: 'video test1',
      description: 'random description',
      url: 'http://www.video.com/111',
    });

    video.categories = [category, category2];

    await removeCategoriesFromVideosUseCase.execute({
      category_id: category2.id,
      video_id: video.id,
    });

    expect(video.categories).toHaveLength(1);
  });
});
