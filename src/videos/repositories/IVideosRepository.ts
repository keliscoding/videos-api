import { Video } from '../entities/Video';
import { CreateVideoDTO } from '../dtos/CreateVideoDTO';

interface IVideosRepository {
  create({ title, description, url }: CreateVideoDTO): Promise<Video>;
}

export { IVideosRepository };
