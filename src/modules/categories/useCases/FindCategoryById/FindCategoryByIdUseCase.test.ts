import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoryRepositoryInMemory';
import { FindCategoryByIdUseCase } from './FindCategoryByIdUseCase';

let categoryRepositoryInMemory: ICategoryRepository;
let findCategoryByIdUseCase: FindCategoryByIdUseCase;

describe('Find Category By Id', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
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
