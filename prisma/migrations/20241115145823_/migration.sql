/*
  Warnings:

  - A unique constraint covering the columns `[genSr]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookings_genSr_key" ON "Bookings"("genSr");
