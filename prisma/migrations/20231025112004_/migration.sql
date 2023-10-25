/*
  Warnings:

  - You are about to drop the `AvailableTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `sessionId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `LectureHall` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `LectureHall` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AvailableTime";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "lectureHallId" TEXT NOT NULL,
    CONSTRAINT "Reservation_lectureHallId_fkey" FOREIGN KEY ("lectureHallId") REFERENCES "LectureHall" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("description", "id", "lectureHallId", "name", "status", "userId") SELECT "description", "id", "lectureHallId", "name", "status", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE TABLE "new_LectureHall" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "capacity" INTEGER NOT NULL,
    "location" TEXT,
    "amenities" TEXT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL
);
INSERT INTO "new_LectureHall" ("amenities", "capacity", "id", "location", "name") SELECT "amenities", "capacity", "id", "location", "name" FROM "LectureHall";
DROP TABLE "LectureHall";
ALTER TABLE "new_LectureHall" RENAME TO "LectureHall";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
