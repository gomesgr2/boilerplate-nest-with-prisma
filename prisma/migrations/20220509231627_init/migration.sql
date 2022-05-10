/*
  Warnings:

  - Added the required column `country` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team" ADD COLUMN     "country" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "player" (
    "player_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "teamId" TEXT,

    CONSTRAINT "player_pkey" PRIMARY KEY ("player_id")
);

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;
