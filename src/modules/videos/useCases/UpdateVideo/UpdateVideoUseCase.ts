import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';

interface IRequest {
  id: string;
  title?: string;
  description?: string;
  categories?: Category[];
}

@injectable()
class UpdateVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute({
    id,
    title,
    description,
    categories,
  }: IRequest): Promise<Video> {
    const video = await this.videosRepository.findVideoById(id);

    if (!video) {
      throw new AppError('Video cannot be found');
    }

    video.title = title ? title : video.title;
    video.description = description ? description : video.description;
    video.categories = categories ? categories : video.categories;
    video.updated_at = new Date();

    await this.videosRepository.create(video);

    return video;
  }
}

export { UpdateVideoUseCase };
