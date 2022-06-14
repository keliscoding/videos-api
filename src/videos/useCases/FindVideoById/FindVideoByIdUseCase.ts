import { AppError } from '@errors/AppError';
import { Video } from '@src/videos/entities/Video';
import { IVideosRepository } from '@src/videos/repositories/IVideosRepository';

class FindVideoByIdUseCase {
  constructor(private videosRepository: IVideosRepository) {}

  async execute(id: string): Promise<Video> {
    const video = await this.videosRepository.findVideoById(id);

    if (!video) {
      throw new AppError('Video cannot be found');
    }

    return video;
  }
}

export { FindVideoByIdUseCase };
