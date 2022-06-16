import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';

interface IRequest {
  id: string;
  title: string;
}

@injectable()
class UpdateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({ id, title }: IRequest): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    const titleAlreadyTaken = await this.categoryRepository.findByTitle(title);

    if (titleAlreadyTaken) {
      throw new AppError('Category already exists');
    }

    category.title = title ? title : category.title;

    await this.categoryRepository.updateCategory(category);

    return category;
  }
}

export { UpdateCategoryUseCase };
