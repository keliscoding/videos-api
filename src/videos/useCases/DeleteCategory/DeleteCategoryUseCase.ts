import { ICategoryRepository } from '@src/videos/repositories/ICategoryRepository';

class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}

export { DeleteCategoryUseCase };
