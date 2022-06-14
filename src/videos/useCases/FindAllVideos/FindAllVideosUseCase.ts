import { Video } from '@src/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@src/videos/repositories/IVideosRepository';

class FindAllVideosUseCase {
  constructor(private videosRepository: IVideosRepository) {}

  async execute(): Promise<Video[]> {
    const videos = await this.videosRepository.findAll();

    return videos;
  }
}

export { FindAllVideosUseCase };
