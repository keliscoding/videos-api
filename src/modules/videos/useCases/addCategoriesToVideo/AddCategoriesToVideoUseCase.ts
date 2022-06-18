import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';

interface IRequest {
  video_id: string;
  categories_id: string[];
}

@injectable()
class AddCategoriesToVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ video_id, categories_id }: IRequest): Promise<Video> {
    const video = await this.videosRepository.findVideoById(video_id);

    if (!video) {
      throw new AppError('video not found', 404);
    }

    let categories = await this.categoriesRepository.findByIds(categories_id);

    if (video.categories) {
      categories = video.categories.concat(categories);
    }

    video.categories = categories;

    await this.videosRepository.create(video);

    return video;
  }
}

export { AddCategoriesToVideoUseCase };
