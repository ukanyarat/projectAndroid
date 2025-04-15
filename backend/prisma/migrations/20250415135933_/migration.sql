/*
  Warnings:

  - Added the required column `amount` to the `transfer_slip_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transfer_slip_info" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "recipient" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "time" DROP NOT NULL,
ALTER COLUMN "slip_ref" DROP NOT NULL;
