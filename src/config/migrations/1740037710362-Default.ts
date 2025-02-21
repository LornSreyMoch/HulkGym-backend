import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740037710362 implements MigrationInterface {
    name = 'Default1740037710362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "announcement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "branchId" uuid, CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "location" character varying(255) NOT NULL, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "membership_plan" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "features" text array NOT NULL, "price" numeric(10,2) NOT NULL, "duration_days" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e270c516189a3f2609c413ca451" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD CONSTRAINT "FK_70e4cd1ab2265026985db717ae9" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP CONSTRAINT "FK_70e4cd1ab2265026985db717ae9"`);
        await queryRunner.query(`DROP TABLE "membership_plan"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "announcement"`);
    }

}
