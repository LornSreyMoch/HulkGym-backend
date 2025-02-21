import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740032041908 implements MigrationInterface {
    name = 'Default1740032041908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" ALTER COLUMN "weight" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" ALTER COLUMN "weight" DROP NOT NULL`);
    }

}
