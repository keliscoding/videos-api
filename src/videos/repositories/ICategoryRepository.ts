import { Category } from '../infra/typeorm/entities/Category';

interface ICategoryRepository {
  create(title: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  findByTitle(title: string): Promise<Category>;
}

export { ICategoryRepository };
