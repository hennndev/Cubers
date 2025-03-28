/*
  Warnings:

  - You are about to drop the `_ProjectToProjectRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `project_roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToProjectRole" DROP CONSTRAINT "_ProjectToProjectRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToProjectRole" DROP CONSTRAINT "_ProjectToProjectRole_B_fkey";

-- DropIndex
DROP INDEX "project_members_projectId_key";

-- DropIndex
DROP INDEX "project_members_username_key";

-- DropIndex
DROP INDEX "project_roles_role_key";

-- DropIndex
DROP INDEX "projects_projectOwnerId_key";

-- DropIndex
DROP INDEX "task_comments_memberId_key";

-- DropIndex
DROP INDEX "tasks_projectId_key";

-- AlterTable
ALTER TABLE "project_roles" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProjectToProjectRole";

-- CreateIndex
CREATE INDEX "project_roles_projectId_idx" ON "project_roles"("projectId");

-- CreateIndex
CREATE INDEX "task_comments_taskId_idx" ON "task_comments"("taskId");

-- CreateIndex
CREATE INDEX "tasks_projectId_idx" ON "tasks"("projectId");

-- AddForeignKey
ALTER TABLE "project_roles" ADD CONSTRAINT "project_roles_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
