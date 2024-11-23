/*
  Warnings:

  - Added the required column `semester_part` to the `Semester` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Semester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semester_part" INTEGER NOT NULL,
    "semester_number" INTEGER NOT NULL,
    "semester_year" INTEGER NOT NULL
);
INSERT INTO "new_Semester" ("id", "semester_number", "semester_year") SELECT "id", "semester_number", "semester_year" FROM "Semester";
DROP TABLE "Semester";
ALTER TABLE "new_Semester" RENAME TO "Semester";
CREATE UNIQUE INDEX "Semester_semester_number_semester_year_key" ON "Semester"("semester_number", "semester_year");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
