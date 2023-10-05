-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    CONSTRAINT "Ad_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ad" ("createdAt", "description", "id", "image", "price", "product") SELECT "createdAt", "description", "id", "image", "price", "product" FROM "Ad";
DROP TABLE "Ad";
ALTER TABLE "new_Ad" RENAME TO "Ad";
CREATE UNIQUE INDEX "Ad_description_key" ON "Ad"("description");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
