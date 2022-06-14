import { injectable, inject } from 'tsyringe';

import { IVideosRepository } from '@src/videos/repositories/IVideosRepository';

@injectable()
class DeleteVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.videosRepository.deleteVideo(id);
  }
}

export { DeleteVideoUseCase };
