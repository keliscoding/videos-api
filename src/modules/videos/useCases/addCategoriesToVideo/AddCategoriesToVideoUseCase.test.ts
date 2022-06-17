import { VideosRepositoryInMemory } from '../../repositories/in-memory/VideosRepositoryInMemory';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { AddCategoriesToVideoUseCase } from './AddCategoriesToVideoUseCase';

let videosRepositoryInMemory: IVideosRepository;
let categoriesRepositoryInMemory: ICategoriesRepository;
let addCategoriesToVideosUseCase: AddCategoriesToVideoUseCase;

describe('Add Categories To Video', () => {
  beforeEach(() => {
    videosRepositoryInMemory = new VideosRepositoryInMemory();
    categoriesRepositoryInMemory = CategoriesRepositoryInMemory.getInstance();
    addCategoriesToVideosUseCase = new AddCategoriesToVideoUseCase(
      videosRepositoryInMemory,
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to add a category to a video', async () => {
    const video = await videosRepositoryInMemory.create({
      title: 'video test1',
      description: 'random description',
      url: 'http://www.video.com/111',
    });

    const category = await categoriesRepositoryInMemory.create(
      'add_category_to_video',
    );

    const category2 = await categoriesRepositoryInMemory.create(
      'add_category_to_video_2',
    );

    await addCategoriesToVideosUseCase.execute({
      video_id: video.id,
      categories_id: [category.id, category2.id],
    });

    expect(video.categories).toHaveLength(2);
  });

  it('should be able to add a category to a video without losing its previous categories', async () => {
    const video = await videosRepositoryInMemory.create({
      title: 'video test1',
      description: 'random description',
      url: 'http://www.video.com/111',
    });

    const category = await categoriesRepositoryInMemory.create(
      'add_category_to_video_3',
    );

    await addCategoriesToVideosUseCase.execute({
      video_id: video.id,
      categories_id: [category.id],
    });

    const category2 = await categoriesRepositoryInMemory.create(
      'add_category_to_video_4',
    );

    await addCategoriesToVideosUseCase.execute({
      video_id: video.id,
      categories_id: [category2.id],
    });

    expect(video.categories).toHaveLength(2);
  });
});
