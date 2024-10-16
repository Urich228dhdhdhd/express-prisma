/*
  Warnings:

  - You are about to drop the column `status` on the `Group` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "group_name" TEXT NOT NULL,
    "curator_id" INTEGER,
    "status_group" TEXT NOT NULL DEFAULT 'ACTIVE',
    "semester_number" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Group_curator_id_fkey" FOREIGN KEY ("curator_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("curator_id", "group_name", "id", "semester_number") SELECT "curator_id", "group_name", "id", "semester_number" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE UNIQUE INDEX "Group_group_name_key" ON "Group"("group_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
