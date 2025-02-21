import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740037324841 implements MigrationInterface {
    name = 'Default1740037324841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "branchContact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying(20) NOT NULL, "branchId" uuid, CONSTRAINT "PK_7ae0f40a42893d9c24d2cd5977d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "branchContact" ADD CONSTRAINT "FK_61e53bbe42e3730f3363c25a52d" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branchContact" DROP CONSTRAINT "FK_61e53bbe42e3730f3363c25a52d"`);
        await queryRunner.query(`DROP TABLE "branchContact"`);
    }

}
