import { Video } from '../infra/typeorm/entities/Video';
import { CreateVideoDTO } from '../dtos/CreateVideoDTO';

interface IVideosRepository {
  create({
    title,
    description,
    url,
    categories,
    id,
  }: CreateVideoDTO): Promise<Video>;
  findVideoByUrl(url: string): Promise<Video>;
  findAll(): Promise<Video[]>;
  findVideoById(id: string): Promise<Video>;
  deleteVideo(id: string): Promise<void>;
  findVideosByCategoryId(id: string): Promise<Video[]>;
}

export { IVideosRepository };
