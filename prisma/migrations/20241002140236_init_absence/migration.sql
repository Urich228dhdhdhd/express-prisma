-- CreateTable
CREATE TABLE "Absence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "absence_illness" INTEGER NOT NULL,
    "absence_order" INTEGER NOT NULL,
    "absence_resp" INTEGER NOT NULL,
    "absence_disresp" INTEGER NOT NULL,
    CONSTRAINT "Absence_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
