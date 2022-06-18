import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBelongs1655493506493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'belongs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'video_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'FKCategoryBelongs',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKVideosBelongs',
            referencedTableName: 'videos',
            referencedColumnNames: ['id'],
            columnNames: ['video_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('belongs');
  }
}
