import { Repository } from 'typeorm';

import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoryRepository } from '../ICategoryRepository';
import { AppDataSource } from '@src/data-source';

class CategoriesRepositoryTypeorm implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create(title: string): Promise<Category> {
    const category = this.repository.create({ title });

    await this.repository.save(category);

    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByTitle(title: string): Promise<Category> {
    const category = await this.repository.findOneBy({ title });

    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOneBy({ id });
    return category;
  }

  async updateCategory({ id, title }: Category): Promise<void> {
    await this.repository.update(id, { title });
  }

  async deleteCategory(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { CategoriesRepositoryTypeorm };
