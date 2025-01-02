/*
  Warnings:

  - You are about to drop the column `userId` on the `project_member` table. All the data in the column will be lost.
  - You are about to drop the `_ProjectToProjectMember` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `project_member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `project_member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `project_member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToProjectMember" DROP CONSTRAINT "_ProjectToProjectMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToProjectMember" DROP CONSTRAINT "_ProjectToProjectMember_B_fkey";

-- DropForeignKey
ALTER TABLE "project_member" DROP CONSTRAINT "project_member_userId_fkey";

-- AlterTable
ALTER TABLE "project_member" DROP COLUMN "userId",
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProjectToProjectMember";

-- CreateIndex
CREATE UNIQUE INDEX "project_member_projectId_key" ON "project_member"("projectId");

-- AddForeignKey
ALTER TABLE "project_member" ADD CONSTRAINT "project_member_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_member" ADD CONSTRAINT "project_member_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
