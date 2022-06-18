import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

let categoryRepositoryInMemory: ICategoriesRepository;
let updateCategoryUseCase: UpdateCategoryUseCase;

describe('Update category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = CategoriesRepositoryInMemory.getInstance();
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
