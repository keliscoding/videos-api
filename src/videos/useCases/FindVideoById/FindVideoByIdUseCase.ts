import { Video } from '../../entities/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';

class FindVideoByIdUseCase {
  constructor(private videosRepository: IVideosRepository) {}

  async execute(id: string): Promise<Video> {
    const video = await this.videosRepository.findVideoById(id);

    return video;
  }
}

export { FindVideoByIdUseCase };
