import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';

class FindAllCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    return categories;
  }
}

export { FindAllCategoriesUseCase };
