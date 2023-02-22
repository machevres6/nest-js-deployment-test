/*
  Warnings:

  - Added the required column `authorEmail` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "authorEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Author" (
    "authorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("authorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "Author"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
