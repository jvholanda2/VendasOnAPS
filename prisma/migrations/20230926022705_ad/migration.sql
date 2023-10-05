-- CreateTable
CREATE TABLE "Ad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Ad_description_key" ON "Ad"("description");
