import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

interface IRequest {
  id: string;
  title: string;
}

@injectable()
class UpdateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
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
