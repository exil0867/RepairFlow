/*
  Warnings:

  - You are about to drop the column `notes` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "notes",
ADD COLUMN     "remark" TEXT;
