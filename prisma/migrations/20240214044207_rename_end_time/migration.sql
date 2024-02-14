/*
  Warnings:

  - You are about to drop the column `endTime` on the `Board` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "endTime",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;
