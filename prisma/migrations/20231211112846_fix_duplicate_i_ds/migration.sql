/*
  Warnings:

  - You are about to drop the column `customerId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `Device` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "customerId";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "deviceId";
