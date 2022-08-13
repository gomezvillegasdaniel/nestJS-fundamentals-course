/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class TodoRefactor1660413916391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" RENAME COLUMN "name" TO "title"`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" RENAME COLUMN "title" TO "name"`,
    );
  }
}
