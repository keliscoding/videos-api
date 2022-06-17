import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[];

  private constructor() {
    this.categories = [];
  }

  private static INSTANCE: CategoriesRepositoryInMemory;

  public static getInstance(): CategoriesRepositoryInMemory {
    if (!CategoriesRepositoryInMemory.INSTANCE) {
      CategoriesRepositoryInMemory.INSTANCE =
        new CategoriesRepositoryInMemory();
    }

    return CategoriesRepositoryInMemory.INSTANCE;
  }

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

  async updateCategory({ id, title }: Category): Promise<void> {
    const index = this.categories.findIndex(video => video.id === id);
    this.categories[index].title = title;
  }

  async findById(id: string): Promise<Category> {
    const category = this.categories.find(category => category.id === id);
    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const categories = this.categories.filter(category => category.id !== id);
    this.categories = categories;
  }

  async findByIds(ids: string[]): Promise<Category[]> {
    const categories = this.categories.filter(categories =>
      ids.includes(categories.id),
    );
    return categories;
  }
}

export { CategoriesRepositoryInMemory };
