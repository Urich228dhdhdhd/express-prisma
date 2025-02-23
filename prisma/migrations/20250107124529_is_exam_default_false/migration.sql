-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "mark" TEXT NOT NULL,
    "is_exam" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Mark_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mark_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mark_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mark" ("id", "is_exam", "mark", "semester_id", "student_id", "subject_id") SELECT "id", "is_exam", "mark", "semester_id", "student_id", "subject_id" FROM "Mark";
DROP TABLE "Mark";
ALTER TABLE "new_Mark" RENAME TO "Mark";
CREATE UNIQUE INDEX "Mark_student_id_semester_id_subject_id_key" ON "Mark"("student_id", "semester_id", "subject_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
