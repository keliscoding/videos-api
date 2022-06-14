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

  async findAll(): Promise<Video[]> {
    return this.videos;
  }

  async findVideoById(id: string): Promise<Video> {
    const video = this.videos.find(video => video.id === id);
    return video;
  }

  async updateVideo({ id, title, description }: Video): Promise<void> {
    const index = this.videos.findIndex(video => video.id === id);
    this.videos[index].title = title;
    this.videos[index].description = description;
  }

  async deleteVideo(id: string): Promise<void> {
    const videos = this.videos.filter(video => video.id !== id);
    this.videos = videos;
  }
}

export { VideosRepositoryInMemory };
