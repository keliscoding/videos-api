import { container } from 'tsyringe';

import { IVideosRepository } from '@modules/videos/repositories/IVideosRepository';
import { VideosRepositoryTypeorm } from '@modules/videos/repositories/implementation/VideosRepositoryTypeorm';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepositoryTypeorm } from '@modules/categories/repositories/implementation/CategoriesRepositoryTypeorm';
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { AccountsRepositoryTypeorm } from '@modules/accounts/repositories/implementation/AccountsRepositoryTypeorm';

container.registerSingleton<IVideosRepository>(
  'VideosRepository',
  VideosRepositoryTypeorm,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepositoryTypeorm,
);

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepositoryTypeorm,
);
