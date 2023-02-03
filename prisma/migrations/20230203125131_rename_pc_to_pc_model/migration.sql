/*
  Warnings:

  - You are about to drop the `PC` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PC";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Pc" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "race" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "class" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
