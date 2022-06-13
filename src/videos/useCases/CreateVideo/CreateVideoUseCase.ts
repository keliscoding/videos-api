import { UniqueFieldError } from '../../../errors/UniqueFieldError';
import { MissingFieldError } from '../../../errors/MissingFieldError';
import { Video } from '../../entities/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';

interface IRequest {
  title: string;
  description: string;
  url: string;
}

class CreateVideoUseCase {
  constructor(private videosRepository: IVideosRepository) {}

  async execute({ title, description, url }: IRequest): Promise<Video> {
    if (!title) throw new MissingFieldError('title');
    if (!description) throw new MissingFieldError('description');
    if (!url) throw new MissingFieldError('url');

    const checksIfUrlIsUnique = await this.videosRepository.findVideoByUrl(url);

    if (checksIfUrlIsUnique) {
      throw new UniqueFieldError('url');
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
