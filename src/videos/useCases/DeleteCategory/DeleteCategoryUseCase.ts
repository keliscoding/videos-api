import { ICategoryRepository } from '@src/videos/repositories/ICategoryRepository';

class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<void> {
    await this.categoryRepository.deleteCategory(id);
  }
}

export { DeleteCategoryUseCase };
