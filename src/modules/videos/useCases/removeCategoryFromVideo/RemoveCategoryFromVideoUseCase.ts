import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  category_id: string;
  video_id: string;
}

@injectable()
class RemoveCategoryFromVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
  ) {}

  async execute({ category_id, video_id }: IRequest): Promise<void> {
    const video = await this.videosRepository.findVideoById(video_id);

    if (!video) {
      throw new AppError('video does not exists', 404);
    }

    if (!video.categories) {
      throw new AppError('video does not have any categories', 404);
    }

    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError('category does not exists', 404);
    }

    video.categories = video.categories.filter(c => c.id !== category_id);

    await this.videosRepository.create(video);
  }
}

export { RemoveCategoryFromVideoUseCase };
