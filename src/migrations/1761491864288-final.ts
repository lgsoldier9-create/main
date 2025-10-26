import { MigrationInterface, QueryRunner } from "typeorm";

export class Final1761491864288 implements MigrationInterface {
    name = 'Final1761491864288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "amount" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "amount" integer NOT NULL`);
    }

}
