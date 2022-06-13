import { CreateVideoDTO } from '../../dtos/CreateVideoDTO';
import { Video } from '../../entities/Video';
import { IVideosRepository } from '../IVideosRepository';

class VideosRepositoryInMemory implements IVideosRepository {
  videos: Video[] = [];

  async create({ title, description, url }: CreateVideoDTO): Promise<Video> {
    const newVideo = new Video();

    Object.assign(newVideo, { title, description, url });

    this.videos.push(newVideo);

    return newVideo;
  }

  async findVideoByUrl(url: string): Promise<Video> {
    const video = this.videos.find(video => video.url === url);
    return video;
  }
}

export { VideosRepositoryInMemory };
