import { AppError } from '@errors/AppError';
import { Category } from '@src/videos/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@src/videos/repositories/ICategoryRepository';

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(title: string): Promise<Category> {
    if (!title) {
      throw new AppError('Title must be provided');
    }

    const formatedTitle = title.toLowerCase();

    const categoryAlreadyExist = await this.categoryRepository.findByTitle(
      formatedTitle,
    );

    if (categoryAlreadyExist) {
      throw new AppError(`Category ${formatedTitle} already exists`);
    }

    const category = await this.categoryRepository.create(formatedTitle);

    return category;
  }
}

export { CreateCategoryUseCase };
