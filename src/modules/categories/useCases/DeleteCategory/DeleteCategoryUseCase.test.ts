import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

let categoryRepositoryInMemory: ICategoriesRepository;
let deleteCategoryUseCase: DeleteCategoryUseCase;

describe('Delete Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = CategoriesRepositoryInMemory.getInstance();
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to delete a category', async () => {
    const category = await categoryRepositoryInMemory.create('category test1');

    await deleteCategoryUseCase.execute(category.id);

    const deletedCategory = await categoryRepositoryInMemory.findById(
      category.id,
    );

    expect(deletedCategory).toBeUndefined();
  });
});
