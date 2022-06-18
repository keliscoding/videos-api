import { injectable, inject } from 'tsyringe';

import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const videoExists = await this.videosRepository.findVideoById(id);

    if (!videoExists) {
      throw new AppError('video not found', 404);
    }

    await this.videosRepository.deleteVideo(id);
  }
}

export { DeleteVideoUseCase };
