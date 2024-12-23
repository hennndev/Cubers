/*
  Warnings:

  - The values [ADMIN,MEMBER,OWNER] on the enum `RoleGroup` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleGroup_new" AS ENUM ('Owner', 'Admin', 'Member');
ALTER TABLE "group_member" ALTER COLUMN "roleGroup" DROP DEFAULT;
ALTER TABLE "group_member" ALTER COLUMN "roleGroup" TYPE "RoleGroup_new" USING ("roleGroup"::text::"RoleGroup_new");
ALTER TYPE "RoleGroup" RENAME TO "RoleGroup_old";
ALTER TYPE "RoleGroup_new" RENAME TO "RoleGroup";
DROP TYPE "RoleGroup_old";
ALTER TABLE "group_member" ALTER COLUMN "roleGroup" SET DEFAULT 'Member';
COMMIT;

-- AlterTable
ALTER TABLE "group_member" ALTER COLUMN "roleGroup" SET DEFAULT 'Member';
