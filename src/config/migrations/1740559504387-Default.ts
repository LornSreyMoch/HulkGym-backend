import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740559504387 implements MigrationInterface {
    name = 'Default1740559504387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "branch" ADD "phone_number" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "branch" ADD "image" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "branch" ADD "location" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "branch" ADD "location" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "branch" ADD "image" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "branch" ADD "phone_number" character varying(20) NOT NULL`);
    }

}
