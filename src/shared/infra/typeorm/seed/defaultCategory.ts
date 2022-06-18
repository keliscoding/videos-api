import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { v4 as uuid } from 'uuid';

async function createFreeCategory() {
  await AppDataSource.initialize();

  const id = uuid();

  await AppDataSource.manager.query(
    `
        INSERT INTO categories(id, title, created_at)
        values('${id}', 'free', 'now()') 
    `,
  );

  await AppDataSource.destroy();
}

createFreeCategory().then(() =>
  console.log('Default category "free" was created.'),
);

export { createFreeCategory };
