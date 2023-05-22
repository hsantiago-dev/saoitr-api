/*
  Warnings:

  - You are about to alter the column `type` on the `Occurrence` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Occurrence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "km" TEXT NOT NULL,
    "contributorId" INTEGER NOT NULL,
    CONSTRAINT "Occurrence_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Occurrence" ("contributorId", "date", "id", "km", "local", "time", "type") SELECT "contributorId", "date", "id", "km", "local", "time", "type" FROM "Occurrence";
DROP TABLE "Occurrence";
ALTER TABLE "new_Occurrence" RENAME TO "Occurrence";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
