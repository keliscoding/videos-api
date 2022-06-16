import { Category } from '../../categories/infra/typeorm/entities/Category';

interface CreateVideoDTO {
  id?: string;
  title: string;
  description: string;
  url: string;
  categories?: Category[];
}

export { CreateVideoDTO };
