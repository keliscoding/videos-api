import { injectable, inject } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { AppError } from '@shared/errors/AppError';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

interface IRequest {
  title: string;
  description: string;
  url: string;
  categories?: Category[];
  id?: string;
}

@injectable()
class CreateVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    title,
    description,
    url,
    categories,
    id,
  }: IRequest): Promise<Video> {
    if (!title) throw new AppError('missing title field');
    if (!description) throw new AppError('missing description field');
    if (!url) throw new AppError('missing url field');

    if (!categories) {
      const category = await this.categoriesRepository.findByTitle('free');
      if (!category) {
        throw new AppError('default category cannot be found');
      }
      categories = [category];
    }

    if (!id) id = uuid();

    const checksIfUrlIsUnique = await this.videosRepository.findVideoByUrl(url);

    if (checksIfUrlIsUnique) {
      throw new AppError('url must be unique');
    }

    const video = await this.videosRepository.create({
      title,
      description,
      url,
      categories,
      id,
    });

    return video;
  }
}

export { CreateVideoUseCase };
