-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userDetailId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userDetailId" DROP NOT NULL,
ALTER COLUMN "emailVerified" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userDetailId_fkey" FOREIGN KEY ("userDetailId") REFERENCES "UserDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
