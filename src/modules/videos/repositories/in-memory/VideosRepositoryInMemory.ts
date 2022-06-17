import {
  CreateVideoDTO,
  PaginationVideoDTO,
} from '@shared/dtos/CreateVideoDTO';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '../IVideosRepository';

class VideosRepositoryInMemory implements IVideosRepository {
  videos: Video[] = [];

  async create({
    title,
    description,
    url,
    id,
    categories,
  }: CreateVideoDTO): Promise<Video> {
    const newVideo = new Video();

    Object.assign(newVideo, { title, description, url, id, categories });

    this.videos.push(newVideo);

    return newVideo;
  }

  async findVideoByUrl(url: string): Promise<Video> {
    const video = this.videos.find(video => video.url === url);
    return video;
  }

  async findAll(offset: number, limit: number): Promise<PaginationVideoDTO> {
    const videos = this.videos;
    const count = videos.length;

    return { videos, count };
  }

  async findVideoById(id: string): Promise<Video> {
    const video = this.videos.find(video => video.id === id);
    return video;
  }

  async deleteVideo(id: string): Promise<void> {
    const videos = this.videos.filter(video => video.id !== id);
    this.videos = videos;
  }

  async findVideosByCategoryId(
    id: string,
    offset: number,
    limit: number,
  ): Promise<PaginationVideoDTO> {
    const videos = this.videos.filter(video =>
      video.categories.filter(category => category.id === id),
    );

    const count = videos.length;

    return { videos, count };
  }

  async findVideosByTitle(
    title: string,
    offset: number,
    limit: number,
  ): Promise<PaginationVideoDTO> {
    const videos = this.videos.filter(video => video.title.includes(title));
    const count = videos.length;

    return { videos, count };
  }
}

export { VideosRepositoryInMemory };
