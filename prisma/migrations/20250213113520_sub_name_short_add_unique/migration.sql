/*
  Warnings:

  - A unique constraint covering the columns `[subject_name_short]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subject_subject_name_short_key" ON "Subject"("subject_name_short");
