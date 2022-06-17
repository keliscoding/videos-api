import { Video } from '../infra/typeorm/entities/Video';
import {
  CreateVideoDTO,
  PaginationVideoDTO,
} from '../../../shared/dtos/CreateVideoDTO';

interface IVideosRepository {
  create({
    title,
    description,
    url,
    categories,
    id,
  }: CreateVideoDTO): Promise<Video>;
  findVideoByUrl(url: string): Promise<Video>;
  findAll(limit: number, offset: number): Promise<PaginationVideoDTO>;
  findVideoById(id: string): Promise<Video>;
  deleteVideo(id: string): Promise<void>;
  findVideosByCategoryId(
    id: string,
    limit: number,
    offset: number,
  ): Promise<PaginationVideoDTO>;
  findVideosByTitle(
    title: string,
    limit: number,
    offset: number,
  ): Promise<PaginationVideoDTO>;
}

export { IVideosRepository };
