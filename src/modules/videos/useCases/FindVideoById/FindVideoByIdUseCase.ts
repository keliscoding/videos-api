import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';

@injectable()
class FindVideoByIdUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute(id: string): Promise<Video> {
    const video = await this.videosRepository.findVideoById(id);

    if (!video) {
      throw new AppError('video not found', 404);
    }

    return video;
  }
}

export { FindVideoByIdUseCase };
