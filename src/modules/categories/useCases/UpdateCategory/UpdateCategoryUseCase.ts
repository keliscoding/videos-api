import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';

class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({ id, title }: Category): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    category.title = title ? title : category.title;

    await this.categoryRepository.updateCategory(category);

    return category;
  }
}

export { UpdateCategoryUseCase };
