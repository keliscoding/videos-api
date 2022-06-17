import { Category } from '../../modules/categories/infra/typeorm/entities/Category';
import { Video } from '../../modules/videos/infra/typeorm/entities/Video';

interface CreateVideoDTO {
  id?: string;
  title: string;
  description: string;
  url: string;
  categories?: Category[];
}

interface PaginationVideoDTO {
  videos: Video[];
  count: number;
}

export { CreateVideoDTO, PaginationVideoDTO };
