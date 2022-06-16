import { AppError } from '@errors/AppError';
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';

interface IRequest {
  category_id: string;
  video_id: string;
}

class RemoveCategoryFromVideoUseCase {
  constructor(
    private videosRepository: IVideosRepository,
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({ category_id, video_id }: IRequest): Promise<void> {
    const video = await this.videosRepository.findVideoById(video_id);

    if (!video) {
      throw new AppError('Video does not exists');
    }

    if (!video.categories) {
      throw new AppError('Video does not have any categories');
    }

    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category does not exists');
    }

    video.categories = video.categories.filter(c => c.id !== category_id);

    await this.videosRepository.updateVideo(video);
  }
}

export { RemoveCategoryFromVideoUseCase };
