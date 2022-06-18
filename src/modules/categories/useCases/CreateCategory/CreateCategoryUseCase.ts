import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
  ) {}

  async execute(title: string): Promise<Category> {
    if (!title) {
      throw new AppError('Title must be provided');
    }

    const formatedTitle = title.toLowerCase();

    const categoryAlreadyExist = await this.categoryRepository.findByTitle(
      formatedTitle,
    );

    if (categoryAlreadyExist) {
      throw new AppError(`category ${formatedTitle} already exists`);
    }

    const category = await this.categoryRepository.create(formatedTitle);

    return category;
  }
}

export { CreateCategoryUseCase };
