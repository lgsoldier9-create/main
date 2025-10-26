import { MigrationInterface, QueryRunner } from "typeorm";

export class Final1761493506701 implements MigrationInterface {
    name = 'Final1761493506701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vinyls" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "authorName" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_309b6afad2f0f00e32f99a9bf79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "rating" integer NOT NULL, "userId" integer, "vinylId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "authProvider" character varying NOT NULL DEFAULT 'local', "googleId" character varying, "email" character varying NOT NULL, "hashedPassword" character varying, "avatarUrl" character varying, CONSTRAINT "UQ_f382af58ab36057334fb262efd5" UNIQUE ("googleId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase_item" ("id" SERIAL NOT NULL, "purchaseId" integer NOT NULL, "vinylId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_ec14599eb4ba29903d9b01b26f" UNIQUE ("vinylId"), CONSTRAINT "PK_e7e6cd38bb62fd147ab2f91f656" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_status_enum" AS ENUM('PENDING', 'COMPLETED', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "amount" numeric(10,2) NOT NULL DEFAULT '0', "userId" integer NOT NULL, "sessionId" character varying NOT NULL, "status" "public"."purchase_status_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_824ac8e8ce880d78453bbdca9cb" FOREIGN KEY ("vinylId") REFERENCES "vinyls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "FK_29ba18d69c81231e8ffabe478b4" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_item" ADD CONSTRAINT "FK_ec14599eb4ba29903d9b01b26f6" FOREIGN KEY ("vinylId") REFERENCES "vinyls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "FK_ec14599eb4ba29903d9b01b26f6"`);
        await queryRunner.query(`ALTER TABLE "purchase_item" DROP CONSTRAINT "FK_29ba18d69c81231e8ffabe478b4"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_824ac8e8ce880d78453bbdca9cb"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_status_enum"`);
        await queryRunner.query(`DROP TABLE "purchase_item"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "vinyls"`);
    }

}
