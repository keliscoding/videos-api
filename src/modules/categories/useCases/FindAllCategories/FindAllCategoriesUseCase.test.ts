import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { FindAllCategoriesUseCase } from './FindAllCategoriesUseCase';

let categoryRepositoryInMemory: ICategoriesRepository;
let findAllCategoriesUseCase: FindAllCategoriesUseCase;

describe('Find All Videos', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = CategoriesRepositoryInMemory.getInstance();
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
