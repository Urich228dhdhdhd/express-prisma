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
    CONSTRAINT "Absence_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Absence" ("absence_disresp", "absence_illness", "absence_order", "absence_resp", "id", "month", "student_id", "year") SELECT "absence_disresp", "absence_illness", "absence_order", "absence_resp", "id", "month", "student_id", "year" FROM "Absence";
DROP TABLE "Absence";
ALTER TABLE "new_Absence" RENAME TO "Absence";
CREATE UNIQUE INDEX "Absence_student_id_year_month_key" ON "Absence"("student_id", "year", "month");
CREATE TABLE "new_ListOfSubject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    CONSTRAINT "ListOfSubject_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ListOfSubject_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ListOfSubject_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ListOfSubject" ("group_id", "id", "semester_id", "subject_id") SELECT "group_id", "id", "semester_id", "subject_id" FROM "ListOfSubject";
DROP TABLE "ListOfSubject";
ALTER TABLE "new_ListOfSubject" RENAME TO "ListOfSubject";
CREATE UNIQUE INDEX "ListOfSubject_subject_id_group_id_semester_id_key" ON "ListOfSubject"("subject_id", "group_id", "semester_id");
CREATE TABLE "new_Mark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "mark" TEXT NOT NULL,
    "is_exam" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Mark_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Mark_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Mark_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Mark" ("id", "is_exam", "mark", "semester_id", "student_id", "subject_id") SELECT "id", "is_exam", "mark", "semester_id", "student_id", "subject_id" FROM "Mark";
DROP TABLE "Mark";
ALTER TABLE "new_Mark" RENAME TO "Mark";
CREATE UNIQUE INDEX "Mark_student_id_semester_id_subject_id_key" ON "Mark"("student_id", "semester_id", "subject_id");
CREATE TABLE "new_PerformanceReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "reportName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PerformanceReport_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PerformanceReport" ("created_at", "filePath", "id", "reportName", "user_id") SELECT "created_at", "filePath", "id", "reportName", "user_id" FROM "PerformanceReport";
DROP TABLE "PerformanceReport";
ALTER TABLE "new_PerformanceReport" RENAME TO "PerformanceReport";
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT,
    "middle_name" TEXT,
    "last_name" TEXT,
    "tel_number" TEXT,
    "date_birthday" DATETIME,
    "group_id" INTEGER NOT NULL,
    CONSTRAINT "Student_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("date_birthday", "first_name", "group_id", "id", "last_name", "middle_name", "tel_number") SELECT "date_birthday", "first_name", "group_id", "id", "last_name", "middle_name", "tel_number" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_first_name_middle_name_last_name_tel_number_key" ON "Student"("first_name", "middle_name", "last_name", "tel_number");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
