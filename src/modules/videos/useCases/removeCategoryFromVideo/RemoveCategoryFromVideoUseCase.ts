import { AppError } from '@errors/AppError';
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

    await this.videosRepository.create(video);
  }
}

export { RemoveCategoryFromVideoUseCase };
