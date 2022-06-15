import { ICategoryRepository } from '@src/videos/repositories/ICategoryRepository';
import { Category } from '@src/videos/infra/typeorm/entities/Category';

class FindAllCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    return categories;
  }
}

export { FindAllCategoriesUseCase };
