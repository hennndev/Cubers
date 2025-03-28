/*
  Warnings:

  - The values [ToDo,InProgress,InReview] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `level` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `assigneeId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `_ProjectToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToRoleProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectOwnerId]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedBudget` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('Pending', 'On_Going', 'On_Hold', 'Completed');

-- CreateEnum
CREATE TYPE "ProjectPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "RoleControl" AS ENUM ('Owner', 'Admin', 'Member');

-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('Not_Started', 'In_Research', 'On_Track', 'Revision', 'Done');
ALTER TABLE "tasks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tasks" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'Not_Started';
COMMIT;

-- DropForeignKey
ALTER TABLE "_ProjectToRole" DROP CONSTRAINT "_ProjectToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToRole" DROP CONSTRAINT "_ProjectToRole_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToRoleProject" DROP CONSTRAINT "_ProjectToRoleProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToRoleProject" DROP CONSTRAINT "_ProjectToRoleProject_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTask" DROP CONSTRAINT "_ProjectToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTask" DROP CONSTRAINT "_ProjectToTask_B_fkey";

-- DropForeignKey
ALTER TABLE "project_member" DROP CONSTRAINT "project_member_projectId_fkey";

-- DropForeignKey
ALTER TABLE "project_member" DROP CONSTRAINT "project_member_username_fkey";

-- DropForeignKey
ALTER TABLE "role_project" DROP CONSTRAINT "role_project_roleId_fkey";

-- DropForeignKey
ALTER TABLE "role_project" DROP CONSTRAINT "role_project_userId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assigneeId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "level",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "estimatedBudget" TEXT NOT NULL,
ADD COLUMN     "priority" "ProjectPriority" NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "assigneeId",
DROP COLUMN "review",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD COLUMN     "subTasks" TEXT[],
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "status" SET DEFAULT 'Not_Started';

-- DropTable
DROP TABLE "_ProjectToRole";

-- DropTable
DROP TABLE "_ProjectToRoleProject";

-- DropTable
DROP TABLE "_ProjectToTask";

-- DropTable
DROP TABLE "project_member";

-- DropTable
DROP TABLE "role_project";

-- DropTable
DROP TABLE "roles";

-- DropEnum
DROP TYPE "ProjectLevel";

-- DropEnum
DROP TYPE "RoleProjectControl";

-- CreateTable
CREATE TABLE "project_roles" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_members" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleControl" "RoleControl" NOT NULL DEFAULT 'Member',
    "projectId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "project_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_comments" (
    "id" SERIAL NOT NULL,
    "teks" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "task_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToProjectRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectMemberToProjectRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectMemberToProjectTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "project_roles_role_key" ON "project_roles"("role");

-- CreateIndex
CREATE UNIQUE INDEX "project_members_projectId_key" ON "project_members"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "project_members_username_key" ON "project_members"("username");

-- CreateIndex
CREATE INDEX "project_members_username_idx" ON "project_members"("username");

-- CreateIndex
CREATE INDEX "project_members_projectId_idx" ON "project_members"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "task_comments_memberId_key" ON "task_comments"("memberId");

-- CreateIndex
CREATE INDEX "task_comments_memberId_idx" ON "task_comments"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToProjectRole_AB_unique" ON "_ProjectToProjectRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToProjectRole_B_index" ON "_ProjectToProjectRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectMemberToProjectRole_AB_unique" ON "_ProjectMemberToProjectRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectMemberToProjectRole_B_index" ON "_ProjectMemberToProjectRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectMemberToProjectTask_AB_unique" ON "_ProjectMemberToProjectTask"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectMemberToProjectTask_B_index" ON "_ProjectMemberToProjectTask"("B");

-- CreateIndex
CREATE UNIQUE INDEX "projects_projectOwnerId_key" ON "projects"("projectOwnerId");

-- CreateIndex
CREATE INDEX "projects_projectOwnerId_idx" ON "projects"("projectOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_projectId_key" ON "tasks"("projectId");

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_comments" ADD CONSTRAINT "task_comments_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "project_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_comments" ADD CONSTRAINT "task_comments_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToProjectRole" ADD CONSTRAINT "_ProjectToProjectRole_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToProjectRole" ADD CONSTRAINT "_ProjectToProjectRole_B_fkey" FOREIGN KEY ("B") REFERENCES "project_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMemberToProjectRole" ADD CONSTRAINT "_ProjectMemberToProjectRole_A_fkey" FOREIGN KEY ("A") REFERENCES "project_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMemberToProjectRole" ADD CONSTRAINT "_ProjectMemberToProjectRole_B_fkey" FOREIGN KEY ("B") REFERENCES "project_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMemberToProjectTask" ADD CONSTRAINT "_ProjectMemberToProjectTask_A_fkey" FOREIGN KEY ("A") REFERENCES "project_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMemberToProjectTask" ADD CONSTRAINT "_ProjectMemberToProjectTask_B_fkey" FOREIGN KEY ("B") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
