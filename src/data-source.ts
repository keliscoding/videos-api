import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  username: 'docker',
  password: 'videoflix',
  database:
    process.env.NODE_ENV === 'test' ? 'videoflix_tests' : 'videoflix_database',
  synchronize: process.env.NODE_ENV === 'test',
  dropSchema: process.env.NODE_ENV === 'test',
  logging: false,
  migrations: [__dirname + '/infra/typeorm/migrations/*.ts'],
  entities: [
    __dirname + '/modules/videos/infra/typeorm/entities/*.ts',
    __dirname + '/modules/categories/infra/typeorm/entities/*.ts',
    __dirname + '/modules/accounts/infra/typeorm/entities/*.ts',
  ],
});
