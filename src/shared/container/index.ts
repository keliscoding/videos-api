import { container } from 'tsyringe';

import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { VideosRepositoryTypeorm } from '@modules/videos/repositories/implementation/VideosRepositoryTypeorm';

container.registerSingleton<IVideosRepository>(
  'VideosRepository',
  VideosRepositoryTypeorm,
);
