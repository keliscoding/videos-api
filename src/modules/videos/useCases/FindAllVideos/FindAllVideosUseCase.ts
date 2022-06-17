import { injectable, inject } from 'tsyringe';

import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';

@injectable()
class FindAllVideosUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute(title?: string): Promise<Video[]> {
    if (title) {
      return this.videosRepository.findVideosByTitle(title);
    }

    return this.videosRepository.findAll();
  }
}

export { FindAllVideosUseCase };
