-- CreateTable
CREATE TABLE "Semester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semester_number" INTEGER NOT NULL,
    "semester_year" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Semester_semester_number_semester_year_key" ON "Semester"("semester_number", "semester_year");
