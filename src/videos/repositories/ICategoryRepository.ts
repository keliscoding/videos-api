import { Category } from '../infra/typeorm/entities/Category';

interface ICategoryRepository {
  create(title: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  findByTitle(title: string): Promise<Category>;
  findById(id: string): Promise<Category>;
  update(category: Category): Promise<void>;
  delete(id: string): Promise<void>;
}

export { ICategoryRepository };
