import { injectable, inject } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Video } from '@src/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '@src/videos/repositories/IVideosRepository';

interface IRequest {
  title: string;
  description: string;
  url: string;
}

@injectable()
class CreateVideoUseCase {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  async execute({ title, description, url }: IRequest): Promise<Video> {
    if (!title) throw new AppError('missing title field');
    if (!description) throw new AppError('missing description field');
    if (!url) throw new AppError('missing url field');

    const checksIfUrlIsUnique = await this.videosRepository.findVideoByUrl(url);

    if (checksIfUrlIsUnique) {
      throw new AppError('url must be unique');
    }

    const video = await this.videosRepository.create({
      title,
      description,
      url,
    });

    return video;
  }
}

export { CreateVideoUseCase };
