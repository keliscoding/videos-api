import { Repository } from 'typeorm';

import { AppDataSource } from '@src/data-source';
import { CreateVideoDTO } from '@modules/videos/dtos/CreateVideoDTO';
import { Video } from '@modules/videos/infra/typeorm/entities/Video';
import { IVideosRepository } from '../IVideosRepository';

class VideosRepositoryTypeorm implements IVideosRepository {
  private repository: Repository<Video>;

  constructor() {
    this.repository = AppDataSource.getRepository(Video);
  }

  async create({ title, description, url }: CreateVideoDTO): Promise<Video> {
    const video = this.repository.create({ title, description, url });

    await this.repository.save(video);

    return video;
  }

  async findVideoByUrl(url: string): Promise<Video> {
    const video = await this.repository.findOneBy({ url });
    return video;
  }

  async findAll(): Promise<Video[]> {
    const videos = await this.repository.find();
    return videos;
  }

  async findVideoById(id: string): Promise<Video> {
    const video = await this.repository.findOneBy({ id });
    return video;
  }

  async updateVideo({ title, description, id }: Video): Promise<void> {
    await this.repository.update(id, { title, description });
  }

  async deleteVideo(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { VideosRepositoryTypeorm };
