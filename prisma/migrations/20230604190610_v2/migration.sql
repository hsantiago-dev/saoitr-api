-- CreateTable
CREATE TABLE "Contributor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Occurrence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "registered_at" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "km" INTEGER NOT NULL,
    "contributorId" INTEGER NOT NULL,
    CONSTRAINT "Occurrence_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Contributor_email_key" ON "Contributor"("email");
