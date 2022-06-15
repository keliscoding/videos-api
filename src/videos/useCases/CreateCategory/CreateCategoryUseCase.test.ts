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
});
