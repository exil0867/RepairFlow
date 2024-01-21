/*
  Warnings:

  - Changed the type of `cost` on the `ConcludedApplication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ConcludedApplication" DROP COLUMN "cost",
ADD COLUMN     "cost" DECIMAL(65,30) NOT NULL;
