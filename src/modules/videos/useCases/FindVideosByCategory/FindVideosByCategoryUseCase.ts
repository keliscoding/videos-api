import { AppError } from '@errors/AppError';
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';

class FindVideosByCategoryUseCase {
  constructor(
    private videosRepository: IVideosRepository,
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<Video[]> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    const videos = await this.videosRepository.findVideosByCategoryId(id);

    return videos;
  }
}

export { FindVideosByCategoryUseCase };
