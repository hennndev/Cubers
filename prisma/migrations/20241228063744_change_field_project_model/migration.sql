/*
  Warnings:

  - You are about to drop the column `roleProject` on the `project_member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "project_member" DROP COLUMN "roleProject",
ADD COLUMN     "roleProjectControl" "RoleProjectControl" NOT NULL DEFAULT 'Member';
