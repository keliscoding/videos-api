import { Video } from '../entities/Video';
import { CreateVideoDTO } from '../dtos/CreateVideoDTO';

interface IVideosRepository {
  create({ title, description, url }: CreateVideoDTO): Promise<Video>;
  findVideoByUrl(url: string): Promise<Video>;
  findAll(): Promise<Video[]>;
  findVideoById(id: string): Promise<Video>;
  updateVideo(video: Video): Promise<void>;
}

export { IVideosRepository };
