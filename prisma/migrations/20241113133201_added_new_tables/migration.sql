-- CreateTable
CREATE TABLE "Generators" (
    "id" SERIAL NOT NULL,
    "genNumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Generators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "genId" INTEGER NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "returnDare" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);
