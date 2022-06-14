import { injectable, inject } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Video } from '@src/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@src/videos/repositories/IVideosRepository';

@injectable()
class FindVideoByIdUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute(id: string): Promise<Video> {
    const video = await this.videosRepository.findVideoById(id);

    if (!video) {
      throw new AppError('Video cannot be found');
    }

    return video;
  }
}

export { FindVideoByIdUseCase };
