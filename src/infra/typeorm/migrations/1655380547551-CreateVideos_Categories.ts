import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVideosCategories1655380547551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('belongs');
  }
}
