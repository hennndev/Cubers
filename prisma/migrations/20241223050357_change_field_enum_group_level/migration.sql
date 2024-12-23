/*
  Warnings:

  - The values [COMMON,MIDDLE,PRIORITY] on the enum `GroupLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GroupLevel_new" AS ENUM ('Common', 'Middle', 'Priority');
ALTER TABLE "groups" ALTER COLUMN "level" TYPE "GroupLevel_new" USING ("level"::text::"GroupLevel_new");
ALTER TYPE "GroupLevel" RENAME TO "GroupLevel_old";
ALTER TYPE "GroupLevel_new" RENAME TO "GroupLevel";
DROP TYPE "GroupLevel_old";
COMMIT;
