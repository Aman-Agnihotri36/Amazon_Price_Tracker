/*
  Warnings:

  - A unique constraint covering the columns `[amazonId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amazonId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "amazonId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_amazonId_key" ON "public"."Product"("amazonId");
