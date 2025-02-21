import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740022111715 implements MigrationInterface {
    name = 'Default1740022111715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "reps"`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "reps" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "reps"`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "reps" integer NOT NULL`);
    }

}
