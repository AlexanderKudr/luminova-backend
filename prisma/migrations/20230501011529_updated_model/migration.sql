/*
  Warnings:

  - Added the required column `imageId` to the `favoriteImages` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_favoriteImages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "imageId" TEXT NOT NULL,
    CONSTRAINT "favoriteImages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_favoriteImages" ("id", "userId") SELECT "id", "userId" FROM "favoriteImages";
DROP TABLE "favoriteImages";
ALTER TABLE "new_favoriteImages" RENAME TO "favoriteImages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
