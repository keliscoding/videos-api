import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { FindCategoryByIdUseCase } from './FindCategoryByIdUseCase';

let categoryRepositoryInMemory: ICategoriesRepository;
let findCategoryByIdUseCase: FindCategoryByIdUseCase;

describe('Find Category By Id', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = CategoriesRepositoryInMemory.getInstance();
    findCategoryByIdUseCase = new FindCategoryByIdUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to find a category by its id', async () => {
    const category = await categoryRepositoryInMemory.create('Category Test');

    const categoryFound = await findCategoryByIdUseCase.execute(category.id);

    expect(categoryFound).toMatchObject(category);
  });
});
