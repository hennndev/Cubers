/*
  Warnings:

  - Made the column `address` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whatsappNumber` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "whatsappNumber" SET NOT NULL;
