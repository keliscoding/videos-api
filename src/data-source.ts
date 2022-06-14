import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  username: 'docker',
  password: 'videoflix',
  database:
    process.env.NODE_ENV == 'test' ? 'videoflix_test' : 'videoflix_database',
  synchronize: true,
  dropSchema: process.env.NODE_ENV == 'test',
  logging: false,
  migrations: [__dirname + '/videos/infra/typeorm/migrations/*.ts'],
  entities: [__dirname + '/videos/infra/typeorm/entities/*.ts'],
});
