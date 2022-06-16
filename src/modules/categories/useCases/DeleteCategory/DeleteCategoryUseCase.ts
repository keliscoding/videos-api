import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.categoryRepository.deleteCategory(id);
  }
}

export { DeleteCategoryUseCase };
