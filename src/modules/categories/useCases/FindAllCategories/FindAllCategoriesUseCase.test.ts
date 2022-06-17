import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoryRepositoryInMemory';
import { FindAllCategoriesUseCase } from './FindAllCategoriesUseCase';

let categoryRepositoryInMemory: ICategoryRepository;
let findAllCategoriesUseCase: FindAllCategoriesUseCase;

describe('Find All Videos', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = CategoryRepositoryInMemory.getInstance();
    findAllCategoriesUseCase = new FindAllCategoriesUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('Should be able to display all created categories', async () => {
    await categoryRepositoryInMemory.create('category test1');

    await categoryRepositoryInMemory.create('category test2');

    const allVideos = await findAllCategoriesUseCase.execute();

    expect(allVideos).toHaveLength(2);
  });
});
