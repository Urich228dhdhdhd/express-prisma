-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PerformanceReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "reportName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PerformanceReport_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PerformanceReport" ("created_at", "filePath", "id", "reportName", "user_id") SELECT "created_at", "filePath", "id", "reportName", "user_id" FROM "PerformanceReport";
DROP TABLE "PerformanceReport";
ALTER TABLE "new_PerformanceReport" RENAME TO "PerformanceReport";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
