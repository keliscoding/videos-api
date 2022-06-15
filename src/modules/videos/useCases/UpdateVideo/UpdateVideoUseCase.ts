import { injectable, inject } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';

interface IRequest {
  id: string;
  title?: string;
  description?: string;
}

@injectable()
class UpdateVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute({ id, title, description }: IRequest): Promise<Video> {
    const video = await this.videosRepository.findVideoById(id);

    if (!video) {
      throw new AppError('Video cannot be found');
    }

    video.title = title ? title : video.title;
    video.description = description ? description : video.description;
    video.updated_at = new Date();

    await this.videosRepository.updateVideo(video);

    return video;
  }
}

export { UpdateVideoUseCase };
