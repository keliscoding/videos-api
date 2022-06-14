import { IVideosRepository } from '../../repositories/IVideosRepository';
import { Video } from '../../entities/Video';

interface IRequest {
  id: string;
  title?: string;
  description?: string;
}

class UpdateVideoUseCase {
  constructor(private videosRepository: IVideosRepository) {}

  async execute({ id, title, description }: IRequest): Promise<Video> {
    const video = await this.videosRepository.findVideoById(id);

    video.title = title ? title : video.title;
    video.description = description ? description : video.description;
    video.updated_at = new Date();

    await this.videosRepository.updateVideo(video);

    return video;
  }
}

export { UpdateVideoUseCase };
