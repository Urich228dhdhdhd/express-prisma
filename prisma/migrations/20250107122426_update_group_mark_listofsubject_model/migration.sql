/*
  Warnings:

  - You are about to drop the column `semester_number` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `semester_number` on the `ListOfSubject` table. All the data in the column will be lost.
  - Added the required column `end_year` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_year` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester_id` to the `ListOfSubject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_exam` to the `Mark` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "group_name" TEXT NOT NULL,
    "curator_id" INTEGER,
    "status_group" TEXT NOT NULL DEFAULT 'ACTIVE',
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER NOT NULL,
    CONSTRAINT "Group_curator_id_fkey" FOREIGN KEY ("curator_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("curator_id", "group_name", "id", "status_group") SELECT "curator_id", "group_name", "id", "status_group" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE UNIQUE INDEX "Group_group_name_key" ON "Group"("group_name");
CREATE TABLE "new_ListOfSubject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    CONSTRAINT "ListOfSubject_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListOfSubject_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListOfSubject_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ListOfSubject" ("group_id", "id", "subject_id") SELECT "group_id", "id", "subject_id" FROM "ListOfSubject";
DROP TABLE "ListOfSubject";
ALTER TABLE "new_ListOfSubject" RENAME TO "ListOfSubject";
CREATE UNIQUE INDEX "ListOfSubject_subject_id_group_id_semester_id_key" ON "ListOfSubject"("subject_id", "group_id", "semester_id");
CREATE TABLE "new_Mark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "mark" TEXT NOT NULL,
    "is_exam" BOOLEAN NOT NULL,
    CONSTRAINT "Mark_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mark_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mark_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mark" ("id", "mark", "semester_id", "student_id", "subject_id") SELECT "id", "mark", "semester_id", "student_id", "subject_id" FROM "Mark";
DROP TABLE "Mark";
ALTER TABLE "new_Mark" RENAME TO "Mark";
CREATE UNIQUE INDEX "Mark_student_id_semester_id_subject_id_key" ON "Mark"("student_id", "semester_id", "subject_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
