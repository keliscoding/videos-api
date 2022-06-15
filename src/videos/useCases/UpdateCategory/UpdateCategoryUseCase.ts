import { Category } from '@src/videos/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@src/videos/repositories/ICategoryRepository';

class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({ id, title }: Category): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    category.title = title ? title : category.title;

    await this.categoryRepository.update(category);

    return category;
  }
}

export { UpdateCategoryUseCase };
