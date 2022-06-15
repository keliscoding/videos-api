import { AppError } from '@errors/AppError';
import { CategoryRepositoryInMemory } from '@src/videos/repositories/in-memory/CategoryRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoryRepositoryInMemory;
let createCategoryUseCase;

describe('create category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to create a category', async () => {
    const category = await createCategoryUseCase.execute('Test Title');

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a category with a title already taken', async () => {
    await createCategoryUseCase.execute('Test Title');

    expect(async () => {
      await createCategoryUseCase.execute('Test Title');
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a category without a title', async () => {
    expect(async () => {
      await createCategoryUseCase.execute('');
    }).rejects.toBeInstanceOf(AppError);
  });
});
