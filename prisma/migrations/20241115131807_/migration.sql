/*
  Warnings:

  - You are about to drop the column `bookingDate` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `genId` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Generators` table. All the data in the column will be lost.
  - You are about to drop the column `genNumber` on the `Generators` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "bookingDate",
DROP COLUMN "genId",
DROP COLUMN "returnDate",
ADD COLUMN     "eventName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "genSr" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "instalationType" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "jobNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "mainClient" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "numberOfDaysToHire" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "projectNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "siteInfo" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "subClient" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Generators" DROP COLUMN "capacity",
DROP COLUMN "genNumber",
ADD COLUMN     "genCapacity" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "genSrNumber" TEXT NOT NULL DEFAULT '';
