/*
  Warnings:

  - You are about to drop the `TeamPerson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TeamPerson";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_PersonToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PersonToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PersonToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_PersonToTeam_AB_unique" ON "_PersonToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonToTeam_B_index" ON "_PersonToTeam"("B");
