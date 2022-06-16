import { AppError } from '@errors/AppError';
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';

interface IRequest {
  video_id: string;
  categories_id: string[];
}

class AddCategoriesToVideoUseCase {
  constructor(
    private videosRepository: IVideosRepository,
    private categoriesRepository: ICategoryRepository,
  ) {}

  async execute({ video_id, categories_id }: IRequest): Promise<void> {
    const video = await this.videosRepository.findVideoById(video_id);

    if (!video) {
      throw new AppError('Video does not exists');
    }

    let categories = await this.categoriesRepository.findByIds(categories_id);

    if (video.categories) {
      categories = video.categories.concat(categories);
    }

    video.categories = categories;

    await this.videosRepository.updateVideo(video);
  }
}

export { AddCategoriesToVideoUseCase };
