/*
  Warnings:

  - Added the required column `transactionId` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('DONATION', 'AIRTIME_PURCHASE', 'WITHDRAWAL', 'DEPOSIT', 'TRANSFER');

-- AlterTable
ALTER TABLE "public"."Donation" ADD COLUMN     "transactionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "type" "public"."TransactionType" NOT NULL,
    "reference" TEXT,
    "description" TEXT,
    "donationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TransactionEntry" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "balanceBefore" DOUBLE PRECISION NOT NULL,
    "balanceAfter" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_donationId_key" ON "public"."Transaction"("donationId");

-- CreateIndex
CREATE INDEX "TransactionEntry_transactionId_idx" ON "public"."TransactionEntry"("transactionId");

-- CreateIndex
CREATE INDEX "TransactionEntry_walletId_idx" ON "public"."TransactionEntry"("walletId");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "public"."Donation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionEntry" ADD CONSTRAINT "TransactionEntry_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "public"."Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionEntry" ADD CONSTRAINT "TransactionEntry_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."Wallet"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
