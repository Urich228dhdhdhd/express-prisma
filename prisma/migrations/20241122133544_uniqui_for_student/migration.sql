/*
  Warnings:

  - A unique constraint covering the columns `[first_name,middle_name,last_name,tel_number]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_first_name_middle_name_last_name_tel_number_key" ON "Student"("first_name", "middle_name", "last_name", "tel_number");
