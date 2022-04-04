import {MigrationInterface, QueryRunner} from "typeorm";

export class LessorMigration1648850946592 implements MigrationInterface {
    name = 'LessorMigration1648850946592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lessor" ("idLessThan" int NOT NULL IDENTITY(1,1), "nameLessor" nvarchar(255) NOT NULL, "addressLessor" nvarchar(255) NOT NULL, "priceAverage" int NOT NULL, "startCount" int NOT NULL, "rateCount" int NOT NULL, "description" nvarchar(255) NOT NULL, CONSTRAINT "PK_ee509e3ec08d4fbbc93c343d6e9" PRIMARY KEY ("idLessThan"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lessor"`);
    }

}
