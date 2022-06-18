import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DropTableCreateVideosCategories1655493404847
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('belongs');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'belongs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
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
}
