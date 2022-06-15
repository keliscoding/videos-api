import { Category } from '@src/videos/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@src/videos/repositories/ICategoryRepository';

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(title: string): Promise<Category> {
    const category = await this.categoryRepository.create(title);

    return category;
  }
}

export { CreateCategoryUseCase };
