/*
  Warnings:

  - You are about to drop the column `prodi` on the `detail_student` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `detail_student` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `detail_student` table. All the data in the column will be lost.
  - You are about to drop the column `job` on the `detail_worker` table. All the data in the column will be lost.
  - You are about to drop the column `userDetailId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `user_detail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `project_member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `project_member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[detailStudentId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[detailWorkerId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gradeLevel` to the `detail_student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution` to the `detail_student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `detail_student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `detail_worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `detail_worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `detail_worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsappNumber` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'STUDENT_AND_WORKER';

-- DropForeignKey
ALTER TABLE "user_detail" DROP CONSTRAINT "user_detail_detailStudentId_fkey";

-- DropForeignKey
ALTER TABLE "user_detail" DROP CONSTRAINT "user_detail_detailWorkerId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_userDetailId_fkey";

-- DropIndex
DROP INDEX "users_userDetailId_idx";

-- DropIndex
DROP INDEX "users_userDetailId_key";

-- AlterTable
ALTER TABLE "detail_student" DROP COLUMN "prodi",
DROP COLUMN "semester",
DROP COLUMN "university",
ADD COLUMN     "gradeLevel" TEXT NOT NULL,
ADD COLUMN     "institution" TEXT NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "detail_worker" DROP COLUMN "job",
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userDetailId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "detailStudentId" INTEGER,
ADD COLUMN     "detailWorkerId" INTEGER,
ADD COLUMN     "status" "UserStatus" NOT NULL,
ADD COLUMN     "whatsappNumber" TEXT NOT NULL;

-- DropTable
DROP TABLE "user_detail";

-- CreateIndex
CREATE UNIQUE INDEX "project_member_username_key" ON "project_member"("username");

-- CreateIndex
CREATE UNIQUE INDEX "project_member_projectId_key" ON "project_member"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "users_detailStudentId_key" ON "users"("detailStudentId");

-- CreateIndex
CREATE UNIQUE INDEX "users_detailWorkerId_key" ON "users"("detailWorkerId");

-- CreateIndex
CREATE INDEX "users_detailStudentId_idx" ON "users"("detailStudentId");

-- CreateIndex
CREATE INDEX "users_detailWorkerId_idx" ON "users"("detailWorkerId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_detailStudentId_fkey" FOREIGN KEY ("detailStudentId") REFERENCES "detail_student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_detailWorkerId_fkey" FOREIGN KEY ("detailWorkerId") REFERENCES "detail_worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
