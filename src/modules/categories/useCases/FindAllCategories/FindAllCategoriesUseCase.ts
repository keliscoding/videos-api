import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';

@injectable()
class FindAllCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    return categories;
  }
}

export { FindAllCategoriesUseCase };
