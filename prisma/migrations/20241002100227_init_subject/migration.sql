-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject_name_short" TEXT NOT NULL,
    "subject_name_long" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subject_name_short_key" ON "Subject"("subject_name_short");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subject_name_long_key" ON "Subject"("subject_name_long");
