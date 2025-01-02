/*
  Warnings:

  - Added the required column `level` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectLevel" AS ENUM ('Common', 'Middle', 'Priority');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "level" "ProjectLevel" NOT NULL;
