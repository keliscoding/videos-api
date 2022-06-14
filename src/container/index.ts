import { container } from 'tsyringe';

import { IVideosRepository } from '@src/videos/repositories/IVideosRepository';
import { VideosRepositoryTypeorm } from '@src/videos/repositories/implementation/VideoRepositoryTypeorm';

container.registerSingleton<IVideosRepository>(
  'VideosRepository',
  VideosRepositoryTypeorm,
);
