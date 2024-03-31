/*
  Warnings:

  - A unique constraint covering the columns `[label,boardId]` on the table `BoardColumn` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BoardColumn_label_boardId_key" ON "BoardColumn"("label", "boardId");
