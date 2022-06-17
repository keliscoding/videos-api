import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { PaginationVideoDTO } from '@shared/dtos/CreateVideoDTO';

@injectable()
class FindVideosByCategoryUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
  ) {}

  async execute(
    id: string,
    limit: number,
    offset: number,
  ): Promise<PaginationVideoDTO> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    return this.videosRepository.findVideosByCategoryId(id, limit, offset);
  }
}

export { FindVideosByCategoryUseCase };
