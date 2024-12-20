/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetailStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetailWorker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MemberGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_groupOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "MemberGroup" DROP CONSTRAINT "MemberGroup_groupId_fkey";

-- DropForeignKey
ALTER TABLE "MemberGroup" DROP CONSTRAINT "MemberGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userDetailId_fkey";

-- DropForeignKey
ALTER TABLE "UserDetail" DROP CONSTRAINT "UserDetail_detailStudentId_fkey";

-- DropForeignKey
ALTER TABLE "UserDetail" DROP CONSTRAINT "UserDetail_detailWorkerId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "DetailStudent";

-- DropTable
DROP TABLE "DetailWorker";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "MemberGroup";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserDetail";

-- CreateTable
CREATE TABLE "account" (
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

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "profileImage" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "loginMethod" "LoginMethod" NOT NULL DEFAULT 'CREDENTIALS',
    "userDetailId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_detail" (
    "id" SERIAL NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'STUDENT',
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "detailStudentId" INTEGER,
    "detailWorkerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail_student" (
    "id" INTEGER NOT NULL,
    "university" TEXT NOT NULL,
    "prodi" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "detail_student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail_worker" (
    "id" INTEGER NOT NULL,
    "job" TEXT NOT NULL,
    "company" TEXT NOT NULL,

    CONSTRAINT "detail_worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "groupOwnerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_member" (
    "id" SERIAL NOT NULL,
    "roleGroup" "RoleGroup" NOT NULL DEFAULT 'MEMBER',
    "role" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "group_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'ToDo',
    "assigneeId" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_providerId_providerAccountId_key" ON "account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "session_sessionToken_key" ON "session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "session_accessToken_key" ON "session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_userDetailId_key" ON "users"("userDetailId");

-- CreateIndex
CREATE INDEX "users_userDetailId_idx" ON "users"("userDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "user_detail_detailStudentId_key" ON "user_detail"("detailStudentId");

-- CreateIndex
CREATE UNIQUE INDEX "user_detail_detailWorkerId_key" ON "user_detail"("detailWorkerId");

-- CreateIndex
CREATE INDEX "user_detail_detailStudentId_idx" ON "user_detail"("detailStudentId");

-- CreateIndex
CREATE INDEX "user_detail_detailWorkerId_idx" ON "user_detail"("detailWorkerId");

-- CreateIndex
CREATE INDEX "groups_groupOwnerId_idx" ON "groups"("groupOwnerId");

-- CreateIndex
CREATE INDEX "group_member_userId_idx" ON "group_member"("userId");

-- CreateIndex
CREATE INDEX "group_member_groupId_idx" ON "group_member"("groupId");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userDetailId_fkey" FOREIGN KEY ("userDetailId") REFERENCES "user_detail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_detailStudentId_fkey" FOREIGN KEY ("detailStudentId") REFERENCES "detail_student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_detailWorkerId_fkey" FOREIGN KEY ("detailWorkerId") REFERENCES "detail_worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_groupOwnerId_fkey" FOREIGN KEY ("groupOwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "group_member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
