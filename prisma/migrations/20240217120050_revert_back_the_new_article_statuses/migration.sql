/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Application` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'DIAGNOSING';

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
