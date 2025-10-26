import { MigrationInterface, QueryRunner } from "typeorm";

export class Final1761491509806 implements MigrationInterface {
    name = 'Final1761491509806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase_item" ("id" SERIAL NOT NULL, "purchaseId" integer NOT NULL, "vinylId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_ec14599eb4ba29903d9b01b26f" UNIQUE ("vinylId"), CONSTRAINT "PK_e7e6cd38bb62fd147ab2f91f656" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_status_enum" AS ENUM('PENDING', 'COMPLETED', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "userId" integer NOT NULL, "sessionId" character varying NOT NULL, "status" "public"."purchase_status_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "FK_29ba18d69c81231e8ffabe478b4" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "FK_ec14599eb4ba29903d9b01b26f6" FOREIGN KEY ("vinylId") REFERENCES "vinyls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "FK_ec14599eb4ba29903d9b01b26f6"`);
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "FK_29ba18d69c81231e8ffabe478b4"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_status_enum"`);
        await queryRunner.query(`DROP TABLE "purchase_item"`);
    }

}
