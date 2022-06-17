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

  async create({
    id,
    title,
    description,
    url,
    categories,
  }: CreateVideoDTO): Promise<Video> {
    const video = this.repository.create({
      id,
      title,
      description,
      url,
      categories,
    });

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
    const video = await this.repository.findOne({
      where: { id },
      relations: { categories: true },
    });
    return video;
  }

  async deleteVideo(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findVideosByCategoryId(id: string): Promise<Video[]> {
    const videos = await this.repository.find({
      where: {
        categories: {
          id: id,
        },
      },
      relations: { categories: true },
    });
    return videos;
  }

  async findVideosByTitle(title: string): Promise<Video[]> {
    const videos = await this.repository
      .createQueryBuilder('videos')
      .where('videos.title ilike :title', { title: `%${title}%` })
      .getMany();

    return videos;
  }
}

export { VideosRepositoryTypeorm };
