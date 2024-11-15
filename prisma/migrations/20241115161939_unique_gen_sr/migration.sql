/*
  Warnings:

  - A unique constraint covering the columns `[genSrNumber]` on the table `Generators` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Bookings_genSr_key";

-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "genSr" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Generators_genSrNumber_key" ON "Generators"("genSrNumber");
