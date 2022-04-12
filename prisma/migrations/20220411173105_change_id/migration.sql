/*
  Warnings:

  - The primary key for the `team` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "team" DROP CONSTRAINT "team_pkey",
ALTER COLUMN "team_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "team_pkey" PRIMARY KEY ("team_id");
