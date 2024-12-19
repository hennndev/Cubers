-- CreateEnum
CREATE TYPE "LoginMethod" AS ENUM ('CREDENTIALS', 'GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loginMethod" "LoginMethod" NOT NULL DEFAULT 'CREDENTIALS';
