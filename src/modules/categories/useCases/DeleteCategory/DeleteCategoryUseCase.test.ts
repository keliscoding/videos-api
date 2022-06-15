import { CategoryRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoryRepositoryInMemory';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

let categoryRepositoryInMemory;
let deleteCategoryUseCase;

describe('Delete Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to delete a category', async () => {
    const category = await categoryRepositoryInMemory.create({
      title: 'category test1',
    });

    await deleteCategoryUseCase.execute(category.id);

    const deletedCategory = await categoryRepositoryInMemory.findById(
      category.id,
    );

    expect(deletedCategory).toBeUndefined();
  });
});
