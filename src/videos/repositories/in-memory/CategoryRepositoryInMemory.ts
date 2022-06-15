import { Category } from '@src/videos/infra/typeorm/entities/Category';
import { ICategoryRepository } from '../ICategoryRepository';

class CategoryRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async create(title: string): Promise<Category> {
    const newCategory = new Category();

    Object.assign(newCategory, { title });

    this.categories.push(newCategory);

    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findByTitle(title: string): Promise<Category> {
    const category = this.categories.find(category => category.title === title);
    return category;
  }
}

export { CategoryRepositoryInMemory };
