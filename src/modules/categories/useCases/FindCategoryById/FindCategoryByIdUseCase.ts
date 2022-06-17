import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

@injectable()
class FindCategoryByIdUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
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
