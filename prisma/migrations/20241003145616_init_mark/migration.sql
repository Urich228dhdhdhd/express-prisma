-- CreateTable
CREATE TABLE "Mark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "mark" TEXT NOT NULL,
    CONSTRAINT "Mark_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mark_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mark_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Mark_student_id_semester_id_subject_id_key" ON "Mark"("student_id", "semester_id", "subject_id");
