import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1739955805080 implements MigrationInterface {
    name = 'Default1739955805080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workout_plan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aea7bdb578979ab3fd974331f5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP NOT NULL DEFAULT now(), "workoutPlanId" uuid, CONSTRAINT "PK_ea37ec052825688082b19f0d939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "sets" integer NOT NULL, "reps" integer NOT NULL, "caloriesBurned" integer DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP NOT NULL DEFAULT now(), "workoutId" uuid, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_f9e23b6c0e611b88ed0c05f2485" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plan"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_e0d55aed97abd4c9a3df6ab2695" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_e0d55aed97abd4c9a3df6ab2695"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_f9e23b6c0e611b88ed0c05f2485"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TABLE "workout"`);
        await queryRunner.query(`DROP TABLE "workout_plan"`);
    }

}
