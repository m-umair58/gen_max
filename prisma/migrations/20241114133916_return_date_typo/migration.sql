/*
  Warnings:

  - You are about to drop the column `returnDare` on the `Bookings` table. All the data in the column will be lost.
  - Added the required column `returnDate` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "returnDare",
ADD COLUMN     "returnDate" TIMESTAMP(3) NOT NULL;
