/*
  Warnings:

  - You are about to drop the column `userId` on the `group_member` table. All the data in the column will be lost.
  - Added the required column `username` to the `group_member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "group_member" DROP CONSTRAINT "group_member_userId_fkey";

-- DropIndex
DROP INDEX "group_member_userId_idx";

-- AlterTable
ALTER TABLE "group_member" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "group_member_username_idx" ON "group_member"("username");

-- AddForeignKey
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
