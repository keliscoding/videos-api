import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  username: 'docker',
  password: 'videoflix',
  database: 'videoflix_database',
  synchronize: true,
  logging: true,
  migrations: [__dirname + '/videos/infra/typeorm/migrations/*.ts'],
  entities: [__dirname + '/videos/infra/typeorm/entities/*.ts'],
});
