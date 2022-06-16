import { container } from 'tsyringe';

import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { VideosRepositoryTypeorm } from '@modules/videos/repositories/implementation/VideosRepositoryTypeorm';
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { CategoriesRepositoryTypeorm } from '@modules/categories/repositories/implementation/CategoriesRepositoryTypeorm';

container.registerSingleton<IVideosRepository>(
  'VideosRepository',
  VideosRepositoryTypeorm,
);

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepositoryTypeorm,
);
