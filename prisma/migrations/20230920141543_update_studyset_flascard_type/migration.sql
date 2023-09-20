/*
  Warnings:

  - The primary key for the `flashcards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `studysets` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_studysetId_fkey";

-- AlterTable
ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "studysetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "flashcards_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "flashcards_id_seq";

-- AlterTable
ALTER TABLE "studysets" DROP CONSTRAINT "studysets_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "studysets_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "studysets_id_seq";

-- AddForeignKey
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_studysetId_fkey" FOREIGN KEY ("studysetId") REFERENCES "studysets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
