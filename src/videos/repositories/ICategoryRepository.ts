import { Category } from '../infra/typeorm/entities/Category';

interface ICategoryRepository {
  create(title: string): Promise<Category>;
}

export { ICategoryRepository };
