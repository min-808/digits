/*
  Warnings:

  - You are about to drop the column `notes` on the `Note` table. All the data in the column will be lost.
  - Added the required column `note` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "notes",
ADD COLUMN     "note" TEXT NOT NULL;
