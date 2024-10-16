-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT,
    "middle_name" TEXT,
    "last_name" TEXT,
    "tel_number" TEXT,
    "date_birthday" DATETIME,
    "group_id" INTEGER NOT NULL,
    CONSTRAINT "Student_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("date_birthday", "first_name", "group_id", "id", "last_name", "middle_name", "tel_number") SELECT "date_birthday", "first_name", "group_id", "id", "last_name", "middle_name", "tel_number" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
