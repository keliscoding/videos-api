import { CategoryRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoryRepositoryInMemory';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

let categoryRepositoryInMemory;
let updateCategoryUseCase;

describe('Update category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    updateCategoryUseCase = new UpdateCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to update category', async () => {
    const category = await categoryRepositoryInMemory.create('this is a title');

    const updatedCategory = await updateCategoryUseCase.execute({
      id: category.id,
      title: 'new Title',
    });

    expect(updatedCategory.title).toEqual(category.title);
  });
});
