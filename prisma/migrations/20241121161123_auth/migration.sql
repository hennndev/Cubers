/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `birthdayDate` on the `UserDetail` table. All the data in the column will be lost.
  - You are about to drop the column `prodi` on the `UserDetail` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `UserDetail` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `UserDetail` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[detailStudentId]` on the table `UserDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[detailWorkerId]` on the table `UserDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('STUDENT', 'WORKER');

-- CreateEnum
CREATE TYPE "RoleGroup" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('ToDo', 'InProgress', 'InReview', 'Revision', 'Done');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropIndex
DROP INDEX "User_roleId_idx";

-- DropIndex
DROP INDEX "User_roleId_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "roleId",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserDetail" DROP COLUMN "birthdayDate",
DROP COLUMN "prodi",
DROP COLUMN "semester",
DROP COLUMN "university",
ADD COLUMN     "detailStudentId" INTEGER,
ADD COLUMN     "detailWorkerId" INTEGER,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "Role";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailStudent" (
    "id" INTEGER NOT NULL,
    "university" TEXT NOT NULL,
    "prodi" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "DetailStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailWorker" (
    "id" INTEGER NOT NULL,
    "job" TEXT NOT NULL,
    "company" TEXT NOT NULL,

    CONSTRAINT "DetailWorker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "groupOwnerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberGroup" (
    "id" SERIAL NOT NULL,
    "roleGroup" "RoleGroup" NOT NULL DEFAULT 'MEMBER',
    "role" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemberGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "assigneeId" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON "Account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE INDEX "Group_groupOwnerId_idx" ON "Group"("groupOwnerId");

-- CreateIndex
CREATE INDEX "MemberGroup_userId_idx" ON "MemberGroup"("userId");

-- CreateIndex
CREATE INDEX "MemberGroup_groupId_idx" ON "MemberGroup"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_detailStudentId_key" ON "UserDetail"("detailStudentId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_detailWorkerId_key" ON "UserDetail"("detailWorkerId");

-- CreateIndex
CREATE INDEX "UserDetail_detailStudentId_idx" ON "UserDetail"("detailStudentId");

-- CreateIndex
CREATE INDEX "UserDetail_detailWorkerId_idx" ON "UserDetail"("detailWorkerId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_detailStudentId_fkey" FOREIGN KEY ("detailStudentId") REFERENCES "DetailStudent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_detailWorkerId_fkey" FOREIGN KEY ("detailWorkerId") REFERENCES "DetailWorker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_groupOwnerId_fkey" FOREIGN KEY ("groupOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberGroup" ADD CONSTRAINT "MemberGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberGroup" ADD CONSTRAINT "MemberGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "MemberGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
