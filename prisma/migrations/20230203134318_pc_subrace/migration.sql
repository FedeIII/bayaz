/*
  Warnings:

  - Added the required column `subrace` to the `Pc` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pc" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "race" TEXT NOT NULL,
    "subrace" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "class" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pc" ("age", "class", "createdAt", "height", "name", "race", "size", "speed", "updatedAt", "weight") SELECT "age", "class", "createdAt", "height", "name", "race", "size", "speed", "updatedAt", "weight" FROM "Pc";
DROP TABLE "Pc";
ALTER TABLE "new_Pc" RENAME TO "Pc";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
