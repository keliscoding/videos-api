import { Video } from '../../entities/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';

class FindAllVideosUseCase {
  constructor(private videosRepository: IVideosRepository) {}

  async execute(): Promise<Video[]> {
    const videos = await this.videosRepository.findAll();

    return videos;
  }
}

export { FindAllVideosUseCase };
