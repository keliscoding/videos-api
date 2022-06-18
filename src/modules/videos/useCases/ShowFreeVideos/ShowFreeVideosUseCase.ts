import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';

@injectable()
class ShowFreeVideosUseCase {
  constructor(
    @inject('VideosRepository')
    private videoRepository: IVideosRepository,
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Video[]> {
    const category = await this.categoryRepository.findByTitle('free');

    const { videos } = await this.videoRepository.findVideosByCategoryId(
      category.id,
      5,
      0,
    );

    return videos;
  }
}

export { ShowFreeVideosUseCase };
