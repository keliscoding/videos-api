import { AppError } from '@errors/AppError';
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoryRepositoryInMemory';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

let categoryRepositoryInMemory: ICategoryRepository;
let updateCategoryUseCase: UpdateCategoryUseCase;

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

  it('should not be able to update category with a title already taken', async () => {
    await categoryRepositoryInMemory.create('this is a title');
    const category = await categoryRepositoryInMemory.create(
      'this is another title',
    );

    expect(async () => {
      await updateCategoryUseCase.execute({
        id: category.id,
        title: 'this is a title',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
