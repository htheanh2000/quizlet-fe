/*
  Warnings:

  - You are about to drop the `Flashcard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Studyset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_studysetId_fkey";

-- DropForeignKey
ALTER TABLE "Studyset" DROP CONSTRAINT "Studyset_authorId_fkey";

-- DropTable
DROP TABLE "Flashcard";

-- DropTable
DROP TABLE "Studyset";

-- CreateTable
CREATE TABLE "studysets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studysets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flashcards" (
    "id" SERIAL NOT NULL,
    "studysetId" INTEGER NOT NULL,
    "frontText" TEXT NOT NULL,
    "backText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flashcards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studysets" ADD CONSTRAINT "studysets_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_studysetId_fkey" FOREIGN KEY ("studysetId") REFERENCES "studysets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
