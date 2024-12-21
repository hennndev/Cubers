/*
  Warnings:

  - Added the required column `level` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupLevel" AS ENUM ('COMMON', 'MIDDLE', 'PRIORITY');

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "level" "GroupLevel" NOT NULL;
