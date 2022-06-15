import { AppError } from '@errors/AppError';
import { Category } from '@src/videos/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@src/videos/repositories/ICategoryRepository';

class FindCategoryByIdUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('category cannot be found');
    }

    return category;
  }
}

export { FindCategoryByIdUseCase };
