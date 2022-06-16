import { injectable, inject } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';

interface IRequest {
  title: string;
  description: string;
  url: string;
  categories?: Category[];
}

@injectable()
class CreateVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute({
    title,
    description,
    url,
    categories,
  }: IRequest): Promise<Video> {
    if (!title) throw new AppError('missing title field');
    if (!description) throw new AppError('missing description field');
    if (!url) throw new AppError('missing url field');

    const checksIfUrlIsUnique = await this.videosRepository.findVideoByUrl(url);

    if (checksIfUrlIsUnique) {
      throw new AppError('url must be unique');
    }

    const video = await this.videosRepository.create({
      title,
      description,
      url,
      categories,
    });

    return video;
  }
}

export { CreateVideoUseCase };
