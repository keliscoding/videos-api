import { injectable, inject } from 'tsyringe';

import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';

@injectable()
class FindAllVideosUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute(): Promise<Video[]> {
    const videos = await this.videosRepository.findAll();

    return videos;
  }
}

export { FindAllVideosUseCase };
