import { CategoryRepositoryInMemory } from '@src/videos/repositories/in-memory/CategoryRepositoryInMemory';
import { FindAllCategoriesUseCase } from './FindAllCategoriesUseCase';

let categoryRepositoryInMemory;
let findAllCategoriesUseCase;

describe('Find All Videos', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    findAllCategoriesUseCase = new FindAllCategoriesUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('Should be able to display all created categories', async () => {
    await categoryRepositoryInMemory.create({
      title: 'category test1',
    });

    await categoryRepositoryInMemory.create({
      title: 'category test2',
    });

    const allVideos = await findAllCategoriesUseCase.execute();

    expect(allVideos).toHaveLength(2);
  });
});
