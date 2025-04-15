/*
  Warnings:

  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "book";

-- CreateTable
CREATE TABLE "transfer_slip_info" (
    "id" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "slip_ref" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transfer_slip_info_pkey" PRIMARY KEY ("id")
);
