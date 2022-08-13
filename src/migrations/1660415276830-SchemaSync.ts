import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1660415276830 implements MigrationInterface {
  name = 'SchemaSync1660415276830';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "description" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
