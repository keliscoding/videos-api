import { AppError } from '@errors/AppError';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoryRepositoryInMemory: ICategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('create category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = CategoriesRepositoryInMemory.getInstance();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to create a category', async () => {
    const category = await createCategoryUseCase.execute('Created Category');

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a category with a title already taken', async () => {
    expect(async () => {
      await createCategoryUseCase.execute('Created Category');
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a category without a title', async () => {
    expect(async () => {
      await createCategoryUseCase.execute('');
    }).rejects.toBeInstanceOf(AppError);
  });
});
