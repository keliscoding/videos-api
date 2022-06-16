import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';

@injectable()
class FindCategoryByIdUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('category cannot be found');
    }

    return category;
  }
}

export { FindCategoryByIdUseCase };
