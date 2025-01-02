-- CreateEnum
CREATE TYPE "RoleProjectControl" AS ENUM ('Owner', 'Member');

-- AlterTable
ALTER TABLE "project_member" ADD COLUMN     "roleProject" "RoleProjectControl" NOT NULL DEFAULT 'Member';
