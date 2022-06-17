import { injectable, inject } from 'tsyringe';

import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { PaginationVideoDTO } from '@shared/dtos/CreateVideoDTO';

@injectable()
class FindAllVideosUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute(
    offset: number,
    limit: number,
    title?: string,
  ): Promise<PaginationVideoDTO> {
    if (title) {
      return this.videosRepository.findVideosByTitle(title, limit, offset);
    }

    return this.videosRepository.findAll(limit, offset);
  }
}

export { FindAllVideosUseCase };
