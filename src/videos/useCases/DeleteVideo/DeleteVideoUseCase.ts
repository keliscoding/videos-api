import { IVideosRepository } from '@src/videos/repositories/IVideosRepository';

class DeleteVideoUseCase {
  constructor(private videosRepository: IVideosRepository) {}

  async execute(id: string): Promise<void> {
    await this.videosRepository.deleteVideo(id);
  }
}

export { DeleteVideoUseCase };
