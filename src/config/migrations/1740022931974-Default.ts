import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740022931974 implements MigrationInterface {
    name = 'Default1740022931974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" ADD "weight" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "weight"`);
    }

}
