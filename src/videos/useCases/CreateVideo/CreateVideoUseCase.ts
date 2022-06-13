import { IVideosRepository } from '../../repositories/IVideosRepository';

interface IRequest {
  title: string;
  description: string;
  url: string;
}

class CreateVideoUseCase {
  constructor(private videosRepository: IVideosRepository) {}

  async execute({ title, description, url }: IRequest) {
    if (!title || !description || !url) {
      throw new Error('all fields must be provided.');
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
