-- CreateTable
CREATE TABLE "ListOfSubject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "semester_number" INTEGER NOT NULL,
    CONSTRAINT "ListOfSubject_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListOfSubject_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ListOfSubject_subject_id_group_id_semester_number_key" ON "ListOfSubject"("subject_id", "group_id", "semester_number");
