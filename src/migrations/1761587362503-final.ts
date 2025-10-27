import { MigrationInterface, QueryRunner } from "typeorm";

export class Final1761587362503 implements MigrationInterface {
    name = 'Final1761587362503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "FK_ec14599eb4ba29903d9b01b26f6"`);
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "REL_ec14599eb4ba29903d9b01b26f"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "FK_ec14599eb4ba29903d9b01b26f6" FOREIGN KEY ("vinylId") REFERENCES "vinyls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "FK_ec14599eb4ba29903d9b01b26f6"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b"`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "REL_ec14599eb4ba29903d9b01b26f" UNIQUE ("vinylId")`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "FK_ec14599eb4ba29903d9b01b26f6" FOREIGN KEY ("vinylId") REFERENCES "vinyls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
