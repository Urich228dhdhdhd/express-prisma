/*
  Warnings:

  - You are about to alter the column `month` on the `Absence` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `year` to the `Absence` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Absence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "absence_illness" INTEGER NOT NULL,
    "absence_order" INTEGER NOT NULL,
    "absence_resp" INTEGER NOT NULL,
    "absence_disresp" INTEGER NOT NULL,
    CONSTRAINT "Absence_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Absence" ("absence_disresp", "absence_illness", "absence_order", "absence_resp", "id", "month", "student_id") SELECT "absence_disresp", "absence_illness", "absence_order", "absence_resp", "id", "month", "student_id" FROM "Absence";
DROP TABLE "Absence";
ALTER TABLE "new_Absence" RENAME TO "Absence";
CREATE UNIQUE INDEX "Absence_student_id_year_month_key" ON "Absence"("student_id", "year", "month");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
