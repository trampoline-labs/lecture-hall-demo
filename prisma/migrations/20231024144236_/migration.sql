/*
  Warnings:

  - You are about to drop the column `date` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `available` on the `LectureHall` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AvailableTime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "lectureHallId" TEXT NOT NULL,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AvailableTime_lectureHallId_fkey" FOREIGN KEY ("lectureHallId") REFERENCES "LectureHall" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "lectureHallId" TEXT NOT NULL,
    CONSTRAINT "Reservation_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AvailableTime" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
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
    "amenities" TEXT
);
INSERT INTO "new_LectureHall" ("amenities", "capacity", "id", "location", "name") SELECT "amenities", "capacity", "id", "location", "name" FROM "LectureHall";
DROP TABLE "LectureHall";
ALTER TABLE "new_LectureHall" RENAME TO "LectureHall";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
